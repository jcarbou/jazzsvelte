/* eslint-disable @typescript-eslint/no-explicit-any */
import DomHandler from './DomHandler'

type Caret = { begin?: number; end?: number }

export interface MaskOptions {
    mask: string | null
    slotChar: string
    autoClear: boolean
    unmask: boolean
    readOnly: boolean
    onComplete: ((event: MaskEvent) => void) | null
    onChange: ((event: MaskEvent) => void) | null
    onFocus: ((event: Event) => void) | null
    onBlur: ((event: Event) => void) | null
}

export interface MaskEvent {
    originalEvent: Event
    value: string
    stopPropagation?: () => void
    preventDefault?: () => void
    target?: {
        value: string
    }
}

export function mask(el: HTMLInputElement, options: MaskOptions) {
    const defaultOptions: MaskOptions = {
        mask: null,
        slotChar: '_',
        autoClear: true,
        unmask: false,
        readOnly: false,
        onComplete: null,
        onChange: null,
        onFocus: null,
        onBlur: null
    }

    options = { ...defaultOptions, ...options }

    let tests: (RegExp | null)[],
        partialPosition: number,
        len: number,
        firstNonMaskPos: number | null,
        defs: { [key: string]: string },
        androidChrome: boolean,
        lastRequiredNonMaskPos: number,
        oldVal: string,
        focusText: string,
        caretTimeoutId: any,
        buffer: string[],
        defaultBuffer: string

    const caret = (first?: number, last?: number): Caret | undefined => {
        let begin: number, end: number

        if (!el.offsetParent || el !== document.activeElement) {
            return
        }

        if (typeof first === 'number') {
            begin = first
            end = typeof last === 'number' ? last : begin

            if (el.setSelectionRange) {
                el.setSelectionRange(begin, end)
            }
        } else {
            begin = el.selectionStart!
            end = el.selectionEnd!

            return { begin, end }
        }
    }

    const isCompleted = () => {
        for (let i = firstNonMaskPos!; i <= lastRequiredNonMaskPos; i++) {
            if (tests[i] && buffer[i] === getPlaceholder(i)) {
                return false
            }
        }
        return true
    }

    const getPlaceholder = (i: number) => {
        if (i < options.slotChar.length) {
            return options.slotChar.charAt(i)
        }
        return options.slotChar.charAt(0)
    }

    const getValue = () => {
        return options.unmask ? getUnmaskedValue() : el && el.value
    }

    const seekNext = (pos: number) => {
        while (++pos < len && !tests[pos]);
        return pos
    }

    const seekPrev = (pos: number) => {
        while (--pos >= 0 && !tests[pos]);
        return pos
    }

    const shiftL = (begin: number, end: number) => {
        let i: number, j: number

        if (begin < 0) {
            return
        }

        for (i = begin, j = seekNext(end); i < len; i++) {
            if (tests[i]) {
                if (j < len && tests[i]?.test(buffer[j])) {
                    buffer[i] = buffer[j]
                    buffer[j] = getPlaceholder(j)
                } else {
                    break
                }
                j = seekNext(j)
            }
        }

        writeBuffer()
        caret(Math.max(firstNonMaskPos!, begin))
    }

    const shiftR = (pos: number) => {
        let i: number, c: string, j: number, t: string

        for (i = pos, c = getPlaceholder(pos); i < len; i++) {
            if (tests[i]) {
                j = seekNext(i)
                t = buffer[i]
                buffer[i] = c

                if (j < len && tests[j]?.test(t)) {
                    c = t
                } else {
                    break
                }
            }
        }
    }

    const handleAndroidInput = (e: Event) => {
        const curVal = el.value
        const pos = caret()

        if (!pos || pos.begin === undefined) return

        if (oldVal && oldVal.length && oldVal.length > curVal.length) {
            // a deletion or backspace happened
            checkVal(true)

            while (pos.begin > 0 && !tests[pos.begin - 1]) {
                pos.begin--
            }

            if (pos.begin === 0) {
                while (pos.begin < firstNonMaskPos! && !tests[pos.begin]) {
                    pos.begin++
                }
            }

            caret(pos.begin, pos.begin)
        } else {
            checkVal(true)

            while (pos.begin < len && !tests[pos.begin]) {
                pos.begin++
            }

            caret(pos.begin, pos.begin)
        }

        if (options.onComplete && isCompleted()) {
            options.onComplete({
                originalEvent: e,
                value: getValue()
            })
        }
    }

    const onBlur = (e: Event) => {
        checkVal()
        options.onBlur && options.onBlur(e)
        updateModel(e)

        if (el.value !== focusText) {
            const event = document.createEvent('HTMLEvents')
            event.initEvent('change', true, false)
            el.dispatchEvent(event)
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (options.readOnly) {
            return
        }

        const k = e.which || e.keyCode
        let pos: Caret | undefined

        oldVal = el.value

        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (DomHandler.isIOS() && k === 127)) {
            pos = caret()

            if (!pos || pos.begin === undefined || pos.end === undefined) return

            let begin = pos.begin
            let end = pos.end

            if (end - begin === 0) {
                begin = k !== 46 ? seekPrev(begin) : (end = seekNext(begin - 1))
                end = k === 46 ? seekNext(end) : end
            }

            clearBuffer(begin, end)
            shiftL(begin, end - 1)
            updateModel(e)
            e.preventDefault()
        } else if (k === 13) {
            // enter
            onBlur(e)
            updateModel(e)
        } else if (k === 27) {
            // escape
            el.value = focusText
            caret(0, checkVal())
            updateModel(e)
            e.preventDefault()
        }
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (options.readOnly) {
            return
        }

        const k = e.which || e.keyCode,
            pos = caret()
        let p: number,
            c: string,
            next: number,
            completed: boolean = false

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
            //Ignore
            return
        } else if (k && k !== 13) {
            if (!pos || pos.begin === undefined || pos.end === undefined) return

            if (pos.end - pos.begin !== 0) {
                clearBuffer(pos.begin, pos.end)
                shiftL(pos.begin, pos.end - 1)
            }

            p = seekNext(pos.begin - 1)

            if (p < len) {
                c = String.fromCharCode(k)

                if (tests[p]?.test(c)) {
                    shiftR(p)
                    buffer[p] = c
                    writeBuffer()
                    next = seekNext(p)

                    if (DomHandler.isAndroid()) {
                        //Path for CSP Violation on FireFox OS 1.1
                        const proxy = () => {
                            caret(next)
                        }
                        setTimeout(proxy, 0)
                    } else {
                        caret(next)
                    }

                    if (pos.begin <= lastRequiredNonMaskPos!) {
                        completed = isCompleted()
                    }
                }
            }

            e.preventDefault()
        }

        updateModel(e)

        if (options.onComplete && completed) {
            options.onComplete({
                originalEvent: e,
                value: getValue()
            })
        }
    }

    const clearBuffer = (start: number, end: number) => {
        let i: number

        for (i = start; i < end && i < len; i++) {
            if (tests[i]) {
                buffer[i] = getPlaceholder(i)
            }
        }
    }

    const writeBuffer = () => {
        el.value = buffer.join('')
    }

    const checkVal = (allow?: boolean) => {
        //try to place characters where they belong
        const test = el.value
        let lastMatch = -1,
            i: number,
            c: string,
            pos: number

        for (i = 0, pos = 0; i < len; i++) {
            if (tests[i]) {
                buffer[i] = getPlaceholder(i)

                while (pos++ < test.length) {
                    c = test.charAt(pos - 1)

                    if (tests[i]?.test(c)) {
                        buffer[i] = c
                        lastMatch = i
                        break
                    }
                }

                if (pos > test.length) {
                    clearBuffer(i + 1, len)
                    break
                }
            } else {
                if (buffer[i] === test.charAt(pos)) {
                    pos++
                }

                if (i < partialPosition!) {
                    lastMatch = i
                }
            }
        }

        if (allow) {
            writeBuffer()
        } else if (lastMatch! + 1 < partialPosition!) {
            if (options.autoClear || buffer.join('') === defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (el.value) el.value = ''
                clearBuffer(0, len)
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                writeBuffer()
            }
        } else {
            writeBuffer()
            el.value = el.value.substring(0, lastMatch! + 1)
        }

        return partialPosition ? i : firstNonMaskPos!
    }

    const onFocus = (e: Event) => {
        if (options.readOnly) {
            return
        }

        clearTimeout(caretTimeoutId || undefined)

        const pos: number = checkVal()

        caretTimeoutId = setTimeout(() => {
            if (el !== document.activeElement) {
                return
            }

            writeBuffer()

            if (pos === options.mask?.replace('?', '').length) {
                caret(0, pos)
            } else {
                caret(pos)
            }
        }, 100)

        if (options.onFocus) {
            options.onFocus(e)
        }
    }

    const onInput = (event: Event) => {
        if (androidChrome) handleAndroidInput(event)
        else handleInputChange(event)
    }

    const handleInputChange = (e: Event) => {
        if (options.readOnly) {
            return
        }

        const pos = checkVal(true)
        caret(pos)
        updateModel(e)

        if (options.onComplete && isCompleted()) {
            options.onComplete({
                originalEvent: e,
                value: getValue()
            })
        }
    }

    const getUnmaskedValue = () => {
        const unmaskedBuffer: string[] = []

        for (let i = 0; i < buffer.length; i++) {
            const c = buffer[i]

            if (tests[i] && c !== getPlaceholder(i)) {
                unmaskedBuffer.push(c)
            }
        }

        return unmaskedBuffer.join('')
    }

    const updateModel = (e: Event) => {
        if (options.onChange) {
            const val = getValue()

            options.onChange({
                originalEvent: e,
                value: defaultBuffer !== val ? val : '',
                stopPropagation: () => {
                    e.stopPropagation()
                },
                preventDefault: () => {
                    e.preventDefault()
                },
                target: {
                    value: defaultBuffer !== val ? val : ''
                }
            })
        }
    }

    const bindEvents = () => {
        el.addEventListener('focus', onFocus)
        el.addEventListener('blur', onBlur)
        el.addEventListener('keydown', onKeyDown)
        el.addEventListener('keypress', onKeyPress)
        el.addEventListener('input', onInput)
        el.addEventListener('paste', handleInputChange)
    }

    const unbindEvents = () => {
        el.removeEventListener('focus', onFocus)
        el.removeEventListener('blur', onBlur)
        el.removeEventListener('keydown', onKeyDown)
        el.removeEventListener('keypress', onKeyPress)
        el.removeEventListener('input', onInput)
        el.removeEventListener('paste', handleInputChange)
    }

    const init = () => {
        tests = []
        partialPosition = options.mask!.length
        len = options.mask!.length
        firstNonMaskPos = null
        defs = {
            9: '[0-9]',
            a: '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        }
        androidChrome = DomHandler.isChrome() && DomHandler.isAndroid()

        const maskTokens = options.mask!.split('')

        for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]

            if (c === '?') {
                len--
                partialPosition = i
            } else if (defs[c]) {
                tests.push(new RegExp(defs[c]))

                if (firstNonMaskPos === null) {
                    firstNonMaskPos = tests.length - 1
                }

                if (i < partialPosition) {
                    lastRequiredNonMaskPos = tests.length - 1
                }
            } else {
                tests.push(null)
            }
        }

        buffer = []

        for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]

            if (c !== '?') {
                if (defs[c]) buffer.push(getPlaceholder(i))
                else buffer.push(c)
            }
        }

        defaultBuffer = buffer.join('')
    }

    if (el && options.mask) {
        init()
        bindEvents()
    }

    return {
        init,
        bindEvents,
        unbindEvents,
        updateModel,
        getValue
    }
}

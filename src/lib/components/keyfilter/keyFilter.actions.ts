import type { ActionReturn } from 'svelte/action'
import { isAndroid } from '../utils/DOM'
import { isEmpty } from '../utils/ObjectUtils'
import type { KeyFilterRegExp, ValidatedInputEvent } from './keyfilter.types'

export type KeyFilterOptions = {
    validateOnly: boolean
    keyFilterType?: KeyFilterRegExp | null
}

interface Attributes {
    'on:validatedinput': (e: ValidatedInputEvent) => void
}

const DEFAULT_MASKS = {
    pint: /[\d]/,
    int: /[\d-]/,
    pnum: /[\d.]/,
    money: /[\d.\s,]/,
    num: /[\d\-.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
}

const IS_ANDROID: boolean = isAndroid()

export function keyFilter(inputElement: HTMLInputElement, options: KeyFilterOptions): ActionReturn<KeyFilterOptions, Attributes> {
    const { validateOnly, keyFilterType } = options

    inputElement.addEventListener('input', input)

    if (!keyFilterType) return {}

    const regExp: RegExp =
        keyFilterType instanceof RegExp ? keyFilterType : DEFAULT_MASKS[keyFilterType as keyof typeof DEFAULT_MASKS]

    function keydown(event: KeyboardEvent) {
        // non android devices use keydown
        if (validateOnly || IS_ANDROID) return
        if (event.ctrlKey || event.altKey) return

        validateKey(event, event.key)
    }

    function beforeinput(event: InputEvent) {
        if (validateOnly || !IS_ANDROID) return

        validateKey(event, event.data)
    }

    function paste(event: ClipboardEvent) {
        if (validateOnly) return

        const clipboard = event.clipboardData?.getData('text')

        if (!clipboard) return // loop over each letter pasted and if any fail prevent the paste
        ;[...clipboard].forEach((c) => {
            if (!regExp.test(c)) {
                event.preventDefault()
                return false
            }
        })
    }

    function validateKey(event: KeyboardEvent | InputEvent, key: string | null | undefined) {
        if (key === null || key === undefined || key.length !== 1) {
            return
        }

        if (!regExp.test(key)) {
            event.preventDefault()
        }
    }

    function input(event: Event) {
        const value = inputElement.value
        let valid = true

        if (keyFilterType && validateOnly) {
            valid = validate(value)
        }

        inputElement.dispatchEvent(new CustomEvent('validatedinput', { detail: { event, valid } }))
        inputElement.classList.toggle('p-filled', !isEmpty(value))
    }

    function validate(value: string | null | undefined) {
        return !value || regExp.test(value)
    }

    !IS_ANDROID && inputElement.addEventListener('keydown', keydown)
    IS_ANDROID && inputElement.addEventListener('beforeinput', beforeinput)
    inputElement.addEventListener('paste', paste)

    return {
        destroy() {
            inputElement.removeEventListener('keydown', keydown)
            inputElement.removeEventListener('beforeinput', beforeinput)
            inputElement.removeEventListener('paste', paste)
            inputElement.removeEventListener('input', input)
        }
    }
}

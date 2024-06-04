import type { ActionReturn } from 'svelte/action'
import { isAndroid } from '@jazzsvelte/dom'
import { isEmpty } from '@jazzsvelte/object'
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

        console.log('===========> keydown ' + event.key)

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
        if (!validateText(clipboard)) {
            event.preventDefault()
        }
    }

    function validateKey(event: KeyboardEvent | InputEvent, key: string | null | undefined) {
        if (key === null || key === undefined || key.length !== 1) {
            return
        }

        if (!regExp.test(key) || inputElement.disabled) {
            event.preventDefault()
        }
    }

    function validateText(text: string | null | undefined): boolean {
        if (text === null || text === undefined || text.length === 0) return true
        if (inputElement.disabled) return false
        if (!keyFilterType) return true
        return !text.split('').find((c) => !regExp.test(c))
    }

    function input(event: Event) {
        const value = inputElement.value
        let valid = true

        if (keyFilterType && validateOnly) {
            valid = validateText(value)
        }

        inputElement.dispatchEvent(new CustomEvent('validatedinput', { detail: { event, valid } }))
        inputElement.classList.toggle('p-filled', !isEmpty(value))
    }

    !validateOnly && !IS_ANDROID && inputElement.addEventListener('keydown', keydown)
    !validateOnly && IS_ANDROID && inputElement.addEventListener('beforeinput', beforeinput)
    !validateOnly && inputElement.addEventListener('paste', paste)

    return {
        destroy() {
            inputElement.removeEventListener('keydown', keydown)
            inputElement.removeEventListener('beforeinput', beforeinput)
            inputElement.removeEventListener('paste', paste)
            inputElement.removeEventListener('input', input)
        }
    }
}

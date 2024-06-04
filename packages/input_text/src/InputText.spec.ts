import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import InputText from './InputText.svelte'
import { containerTest, later } from '@jazzsvelte/test'

describe('InputText', () => {
    containerTest('when input is enabled then input accepts data entry and have filled state', InputText, {}, async (el) => {
        const inputEl = el as HTMLInputElement
        expect(inputEl).not.toBeNull()

        if (inputEl) {
            // Act
            await fireEvent.keyDown(inputEl, { target: { value: 'abc' } })

            // Act
            expect(inputEl).toBeEnabled()
            expect(inputEl).toHaveValue('abc')
            expect(inputEl).toMatchSnapshot()
        }
    })
    containerTest('when input is blank it should not have filled state', InputText, { disabled: false }, async (inputEl) => {
        expect(inputEl).not.toBeNull()

        if (inputEl) {
            await fireEvent.input(inputEl, { target: { value: '' } })

            // Assert
            expect(inputEl).toBeEnabled()
            expect(inputEl).toHaveValue('')
            expect(inputEl).toMatchSnapshot()
        }
    })
    containerTest('when input has className only 1 className is printed', InputText, { class: 'jest' }, async (inputEl) => {
        expect(inputEl).not.toBeNull()

        if (inputEl) {
            await fireEvent.input(inputEl, { target: { value: 'jest' } })

            // Assert
            expect(inputEl).toMatchSnapshot()
            expect(inputEl).toHaveValue('jest')
        }
    })
    containerTest(
        'when input is is set for validation only',
        InputText,
        { validateOnly: true, keyFilter: `alpha` },
        async (inputEl) => {
            expect(inputEl).not.toBeNull()

            if (inputEl) {
                await fireEvent.input(inputEl, { target: { value: 'def' } })

                // Assert
                expect(inputEl).toMatchSnapshot()
                expect(inputEl).toHaveValue('def')
            }
        }
    )
    containerTest('when input is disabled it should ignore keyboard events', InputText, { disabled: true }, async (inputEl) => {
        expect(inputEl).not.toBeNull()

        if (inputEl) {
            await userEvent.type(inputEl, 'abc')

            // Assert
            expect(inputEl).toBeDisabled()
            expect(inputEl).toHaveValue('')
        }
    })
    containerTest(
        'when input is using keyFilter for integers accept integer input',
        InputText,
        { keyFilter: 'int' },
        async (el, input) => {
            const inputEl = el as HTMLInputElement | null
            expect(inputEl).not.toBeNull()
            expect(input).not.toBeNull()

            if (inputEl && input) {
                const keydownOn = vi.fn()
                input.$on('keydown', keydownOn)
                inputEl.focus()
                await userEvent.type(inputEl, '123')

                // Assert
                expect(inputEl).toHaveValue('123')
                expect(keydownOn).toHaveBeenCalledTimes(3)
            }
        }
    )
    containerTest(
        'when input is using keyFilter for integers do not accept alphabetic input',
        InputText,
        { keyFilter: 'int' },
        async (inputEl, input) => {
            expect(inputEl).not.toBeNull()
            expect(input).not.toBeNull()

            if (inputEl && input) {
                const keydownOn = vi.fn()
                input.$on('keydown', keydownOn)
                await userEvent.type(inputEl, 'abc')

                // Assert
                expect(inputEl).toHaveValue('')
                expect(keydownOn).toHaveBeenCalledTimes(3)
            }
        }
    )
    containerTest(
        'when input is using keyFilter for alphabetic accept paste of alphabetic values',
        InputText,
        { keyFilter: 'alpha' },
        async (el, input) => {
            const inputEl = el as HTMLInputElement | null
            expect(inputEl).not.toBeNull()
            expect(input).not.toBeNull()

            if (inputEl && input) {
                const pasteOn = vi.fn()
                input.$on('paste', pasteOn)
                inputEl.focus()
                await userEvent.paste('abc')

                // Assert
                expect(inputEl).toHaveValue('abc')
                expect(pasteOn).toHaveBeenCalledTimes(1)
            }
        }
    )
    containerTest(
        'when input is using keyFilter for alphabetic do not accept paste of integer values',
        InputText,
        { keyFilter: 'alpha' },
        async (el, input) => {
            const inputEl = el as HTMLInputElement | null
            expect(inputEl).not.toBeNull()
            expect(input).not.toBeNull()

            if (inputEl && input) {
                const pasteOn = vi.fn()
                input.$on('paste', pasteOn)
                inputEl.focus()
                await userEvent.paste('123')

                // Assert
                expect(inputEl).toHaveValue('')
                expect(pasteOn).toHaveBeenCalledTimes(1)
            }
        }
    )
    containerTest('when input is using onInput make sure it is called', InputText, {}, async (el, input) => {
        const inputEl = el as HTMLInputElement | null
        expect(inputEl).not.toBeNull()
        expect(input).not.toBeNull()

        if (inputEl && input) {
            const inputOn = vi.fn()
            input.$on('input', inputOn)
            inputEl.value = 'Jest testing value'
            inputEl.focus()
            await userEvent.paste(' abc')

            // Assert
            expect(inputEl).toHaveValue('Jest testing value abc')
            expect(inputOn).toHaveBeenCalledTimes(1)
        }
    })
})

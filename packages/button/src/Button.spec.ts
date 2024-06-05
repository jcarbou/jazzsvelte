import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte'
import { describe, expect, vi } from 'vitest'
import Button from './Button.svelte'
import { containerTest, snapshot } from '@jazzsvelte/test'

describe('Button', () => {
    snapshot('when visible is false Button return null', Button, { label: 'test', visible: false })
    snapshot('when visible is true Button render correctly', Button, { label: 'test', visible: true })
    snapshot('when iconPos is bottom Button is vertical', Button, { label: 'test', iconPos: 'bottom' })
    snapshot('when label is empty it returns empty button', Button, {})
    snapshot('when badge is true it renders Button with badge', Button, { badge: 'test' })
    snapshot('when badge is null it renders Button without badge', Button, {})
    snapshot('when click the button if loading is true it renders Button with loading icon', Button, { loading: true })
    snapshot('when click the button if loading is false it renders Button without loading icon', Button, {})
    snapshot('when label is true it renders Button with default aria label', Button, {})
    snapshot('when aria-label prop is not exist aria-label prop should be equal to label prop', Button, { label: 'test' })
    snapshot('when label prop is not exist label prop should be equal to aria-label prop', Button, { 'aria-label': 'test' })
    snapshot('when using badge and label the aria-label should contain both values', Button, { label: 'test', badge: 'lost' })

    containerTest(
        'when using tooltip make sure the tooltip is rendered',
        Button,
        { label: 'test', tooltip: 'Jest Tooltip' },
        async (buttonEl) => {
            expect(buttonEl).not.toBeNull()

            if (buttonEl) {
                const tooltipText = /Jest Tooltip/i

                // tooltip does not exist to start
                expect(screen.queryByText(tooltipText)).toBeNull()

                // Act
                fireEvent.mouseEnter(buttonEl)

                // Assert
                await waitFor(() => screen.getByText(tooltipText))
                expect(screen.getByText(tooltipText)).toBeInTheDocument()

                // tooltip disappears when we mouse out
                fireEvent.mouseLeave(buttonEl)
                await waitForElementToBeRemoved(screen.getByText(tooltipText))
                expect(screen.queryByText(tooltipText)).toBeNull()
            }
        }
    )

    containerTest('when button is clicked ensure onClick is fired', Button, { label: 'test' }, async (buttonEl, button) => {
        expect(buttonEl).not.toBeNull()
        expect(button).not.toBeNull()

        if (buttonEl && button) {
            const clickOn = vi.fn()
            button.$on('click', clickOn)

            // Act
            fireEvent.click(buttonEl)

            // Assert
            expect(buttonEl).toBeEnabled()
            expect(clickOn).toHaveBeenCalledTimes(1)
        }
    })

    containerTest(
        'when button is disabled the click event should not fire',
        Button,
        { label: 'test', disabled: true },
        async (buttonEl, button) => {
            expect(buttonEl).not.toBeNull()
            expect(button).not.toBeNull()

            if (buttonEl && button) {
                const clickOn = vi.fn()
                button.$on('click', clickOn)

                // Act
                fireEvent.click(buttonEl)

                // Assert
                expect(buttonEl).toBeDisabled()
                expect(clickOn).not.toHaveBeenCalled()
            }
        }
    )

    containerTest(
        'when Ripple is enabled button should have ripple effect',
        Button,
        { label: 'test', ripple: true },
        async (buttonEl, button) => {
            expect(buttonEl).not.toBeNull()
            expect(button).not.toBeNull()

            if (buttonEl && button) {
                const clickOn = vi.fn()
                button.$on('click', clickOn)

                // Act
                fireEvent.click(buttonEl)

                // Assert
                expect(buttonEl).toBeEnabled()
                expect(clickOn).toHaveBeenCalledTimes(1)
                expect(buttonEl).toMatchSnapshot()
            }
        }
    )
})

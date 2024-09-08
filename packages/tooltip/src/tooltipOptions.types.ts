/**
 *
 * This module contains the common options and events of Tooltip.
 *
 * @module tooltipoptions
 *
 */
import type { CssObject, PassThroughOptions } from '@jazzsvelte/api'
import type { TooltipPassThroughOptions } from './tooltip.types'
import { SvelteComponent } from 'svelte'

/**
 * Custom tooltip event
 * @event
 */
export interface TooltipEvent {
    /**
     * Browser event
     */
    originalEvent: Event
    /**
     * Target element.
     * @defaultValue current target
     */
    target: HTMLElement
}

/**
 * Defines valid properties of TooltipOptions.
 * @group Model
 */
export interface TooltipOptions {
    /**
     * Defines which position on the target element to align the positioned tooltip.
     */
    at?: string
    /**
     * Whether to hide tooltip when hovering over tooltip content.
     * @defaultValue true
     */
    autoHide?: boolean
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number
    /**
     * Style class of the tooltip.
     */
    class?: string

    /**
     * Specifies if pressing escape key should hide the tooltip.
     * @defaultValue false
     */
    closeOnEscape?: boolean
    /**
     * Content to be displayed in tooltip.
     * @defaultValue null
     */
    content?: typeof SvelteComponent | null
    /**
     * When present, it specifies that the tooltip should be hidden.
     * @defaultValue false
     */
    disabled?: boolean
    /**
     * Event to show the tooltip.
     * @defaultValue hover
     */
    event?: 'hover' | 'focus' | 'both'
    /**
     * Delay to hide the tooltip in milliseconds.
     * @defaultValue 0
     */
    hideDelay?: number
    /**
     * Event to hide the tooltip if the event property is empty.
     * @defaultValue mouseleave
     */
    hideEvent?: string
    /**
     * Whether the tooltip will follow the mouse.
     * @defaultValue false
     */
    mouseTrack?: boolean
    /**
     * Defines left position of the tooltip in relation to the mouse when the mouseTrack is enabled.
     * @defaultValue 5
     */
    mouseTrackLeft?: number
    /**
     * Defines top position of the tooltip in relation to the mouse when the mouseTrack is enabled.
     * @defaultValue 5
     */
    mouseTrackTop?: number
    /**
     * Defines which position on the tooltip being positioned to align with the target element.
     */
    my?: string
    /**
     * Position of the tooltip.
     * @defaultValue right
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'mouse'
    /**
     * Delay to show the tooltip in milliseconds.
     * @defaultValue 0
     */
    showDelay?: number
    /**
     * Event to show the tooltip if the event property is empty.
     * @defaultValue mouseenter
     */
    showEvent?: string
    /**
     * Whether to show tooltip for disabled elements.
     * @defaultValue false
     */
    showOnDisabled?: boolean
    /**
     * Style of the tooltip.
     */
    style?: string | CssObject | null
    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
    /**
     * Delay to update the tooltip in milliseconds.
     * @defaultValue 0
     */
    updateDelay?: number
    /**
     * Uses to pass attributes to DOM elements inside the component.
     */
    pt?: TooltipPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions
    /**
     * Callback to invoke before the tooltip is shown.
     * @param {TooltipEvent} event - Browser event
     */
    onBeforeShow?(event: TooltipEvent): void
    /**
     * Callback to invoke before the tooltip is hidden.
     * @param {TooltipEvent} event - Browser event
     */
    onBeforeHide?(event: TooltipEvent): void
    /**
     * Callback to invoke when the tooltip is shown.
     * @param {TooltipEvent} event - Browser event
     */
    onShow?(event: TooltipEvent): void
    /**
     * Callback to invoke when the tooltip is hidden.
     * @param {TooltipEvent} event - Browser event
     */
    onHide?(event: TooltipEvent): void
}

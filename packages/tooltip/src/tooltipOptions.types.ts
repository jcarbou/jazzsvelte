/**
 *
 * This module contains the common options and events of Tooltip.
 *
 * @module tooltipoptions
 *
 */
import type { PassThroughOptions } from '@jazzsvelte/api'
import type { TooltipPassThroughOptions } from './tooltip.types'

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
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | null | (() => HTMLElement)
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
    style?: string
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

/**
 * In addition to HTMLAttributes, the following attributes can be used on any HTMLElement if the page has a JazzSvelte {@link tooltip} component.
 * @group Model
 */

export interface TooltipHTMLAttributes {
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Content of the tooltip.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltip.TooltipProps.content}
     */
    'data-pr-tooltip'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * When present, it specifies that the tooltip should be hidden.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.disabled}
     * @defaultValue false
     */
    'data-pr-disabled'?: boolean | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Style class of the tooltip.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.className}
     */
    'data-pr-classname'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Position of the tooltip.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.position}
     * @defaultValue right
     */
    'data-pr-position'?: 'top' | 'bottom' | 'left' | 'right' | 'mouse' | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Defines which position on the tooltip being positioned to align with the target element.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.my}
     */
    'data-pr-my'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Defines which position on the target element to align the positioned tooltip.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.at}
     */
    'data-pr-at'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Event to show the tooltip.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.event}
     * @defaultValue hover
     */
    'data-pr-event'?: 'hover' | 'focus' | 'both' | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Event to show the tooltip if the event property is empty.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.showEvent}
     * @defaultValue mouseenter
     */
    'data-pr-showevent'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Event to hide the tooltip if the event property is empty.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.hideEvent}
     * @defaultValue mouseleave
     */
    'data-pr-hideevent'?: string | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Whether the tooltip will follow the mouse.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.mouseTrack}
     * @defaultValue false
     */
    'data-pr-mousetrack'?: boolean | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Defines top position of the tooltip in relation to the mouse when the mouseTrack is enabled.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.mouseTrackTop}
     * @defaultValue 5
     */
    'data-pr-mousetracktop'?: number | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Defines left position of the tooltip in relation to the mouse when the mouseTrack is enabled.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.mouseTrackLeft}
     * @defaultValue 5
     */
    'data-pr-mousetrackleft'?: number | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Delay to show the tooltip in milliseconds.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.showDelay}
     * @defaultValue 0
     */
    'data-pr-showdelay'?: number | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Delay to update the tooltip in milliseconds.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.updateDelay}
     * @defaultValue 0
     */
    'data-pr-updatedelay'?: number | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Delay to hide the tooltip in milliseconds.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.hideDelay}
     * @defaultValue 0
     */
    'data-pr-hidedelay'?: number | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Whether to hide tooltip when hovering over tooltip content.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.autoHide}
     * @defaultValue true
     */
    'data-pr-autohide'?: boolean | undefined
    /**
     * **JazzSvelte - TooltipHTMLAttributes**
     *
     * Whether to show tooltip for disabled elements.*
     *
     * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a JazzSvelte {@link tooltip} component on the page._
     *
     * {@inheritDoc tooltipoptions.TooltipOptions.showOnDisabled}
     * @defaultValue false
     */
    'data-pr-showondisabled'?: boolean | undefined
}

import type { SvelteComponent } from 'svelte'
import type {
    JazzSvelteContext,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughOptions,
    PassThroughType,
    CssObject
} from '@jazzsvelte/api'

export declare type TooltipPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, TooltipPassThroughMethodOptions>

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'mouse'

export type TooltipGetter<ITEM> = ((item: ITEM) => string | undefined | null) | keyof ITEM | null

export type TooltipActionOptions = {
    tooltipContent?: string | null
    tooltipOptions?: TooltipOptions | null
    showOnDisabled?: boolean
    jazzSvelteContext: JazzSvelteContext
}

export type TooltipLayoutActionOptions = {
    targetElement: HTMLElement
    tooltipLayoutState: TooltipLayoutActionState
    x: number | null
    y: number | null
    options?: TooltipOptions | null
}

export type TooltipLayoutActionState = {
    setMouseOverTooltip: (state: boolean) => void
    onContentChange: () => void
}

/**
 * Custom passthrough(pt) option method.
 */
export interface TooltipPassThroughMethodOptions {
    props: TooltipProps
    state?: TooltipState
    context?: TooltipContext
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TooltipProps.pt}
 */
export interface TooltipPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TooltipPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the arrow's DOM element.
     */
    arrow?: TooltipPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: TooltipPassThroughType<HTMLDivAttributes>
}

/**
 * Defines current inline context in Tooltip component.
 */
export interface TooltipContext {
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    right: boolean
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    left: boolean
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    top: boolean
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    bottom: boolean
}

/**
 * Defines current inline state in Tooltip component.
 */
export interface TooltipState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean
    /**
     * Current position state as a string.
     * @defaultValue right
     */
    position?: string
    /**
     * Current className state as a string.
     */
    class?: string
}

/**
 * Defines valid properties in Tooltip component. In addition to these, all properties of TooltipOptions can be used in this component.
 * @extends {TooltipOptions}
 * @group Properties
 */
export interface TooltipProps extends TooltipOptions {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined
    /**
     * Target element on global tooltip option.
     */
    target?: string | string[] | HTMLElement | undefined
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TooltipPassThroughOptions}
     */
    pt?: TooltipPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions
}

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
    position?: TooltipPosition
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

/**
 * **JazzSvelte - Tooltip**
 *
 * _Tooltip functionality is integrated within various JazzSvelte components._
 *
 * [Live Demo](https://www.primereact.org/tooltip/)
 * --- ---
 * ![JazzSvelte](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
// export declare class Tooltip extends SvelteComponent<TooltipProps> {
//     /**
//      * Used to reload target events. In some cases, the target element can be hidden initially. Later, when this element becomes visible, it will be necessary to bind tooltip events to this element.
//      * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
//      */
//     public updateTargetEvents(target: string | string[] | HTMLElement | undefined): void
//     /**
//      * Used to load target events.
//      * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
//      */
//     public loadTargetEvents(target: string | string[] | HTMLElement | undefined): void
//     /**
//      * Used to unload target events.
//      * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
//      */
//     public unloadTargetEvents(target: string | string[] | HTMLElement | undefined): void
//     /**
//      * Used to get container element.
//      * @return {HTMLElement} Container element
//      */
//     public getElement(): HTMLElement
//     /**
//      * Used to get target element.
//      * @return {HTMLElement} Target element
//      */
//     public getTarget(): HTMLElement | null
//     /**
//      * Used to show the tooltip.
//      * @param {TooltipEvent} event - Browser event.
//      */
//     public show(event?: TooltipEvent): null
//     /**
//      * Used to hide the tooltip.
//      * @param {TooltipEvent} event - Browser event.
//      */
//     public hide(event?: TooltipEvent): null
// }

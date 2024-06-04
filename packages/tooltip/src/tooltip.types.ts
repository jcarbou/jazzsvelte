import type { SvelteComponent } from 'svelte'
import type {
    JazzSvelteContext,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughOptions,
    PassThroughType
} from '@jazzsvelte/api'
import type { TooltipEvent, TooltipOptions } from './tooltipOptions.types'

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
export declare class Tooltip extends SvelteComponent<TooltipProps> {
    /**
     * Used to reload target events. In some cases, the target element can be hidden initially. Later, when this element becomes visible, it will be necessary to bind tooltip events to this element.
     * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
     */
    public updateTargetEvents(target: string | string[] | HTMLElement | undefined): void
    /**
     * Used to load target events.
     * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
     */
    public loadTargetEvents(target: string | string[] | HTMLElement | undefined): void
    /**
     * Used to unload target events.
     * @param {string | string[] | HTMLElement | undefined} target - Target element or if undefined will use current target.
     */
    public unloadTargetEvents(target: string | string[] | HTMLElement | undefined): void
    /**
     * Used to get container element.
     * @return {HTMLElement} Container element
     */
    public getElement(): HTMLElement
    /**
     * Used to get target element.
     * @return {HTMLElement} Target element
     */
    public getTarget(): HTMLElement | null
    /**
     * Used to show the tooltip.
     * @param {TooltipEvent} event - Browser event.
     */
    public show(event?: TooltipEvent): null
    /**
     * Used to hide the tooltip.
     * @param {TooltipEvent} event - Browser event.
     */
    public hide(event?: TooltipEvent): null
}

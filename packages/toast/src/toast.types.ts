import type { HTMLDivAttributes, PassThroughHTMLAttributes, PassThroughOptions, PassThroughType, CssStyle } from '@jazzsvelte/api'

export type ToastPosition = 'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'

export declare type ToastPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ToastPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 */
export interface ToastPassThroughMethodOptions {
    props: ToastProps
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ToastProps.pt}
 */
export interface ToastPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ToastPassThroughType<HTMLDivAttributes>
}

/**
 * Defines valid properties in Toast component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface BaseToastProps {
    id?: string

    /**
     * Base zIndex value to add to initial layering of PrimeReact components which start from 1000.
     * @defaultValue 0
     */
    // baseZIndex?: number | undefined
    /**
     * Position of the toast in viewport, valid values are 'center', 'top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'.
     * @defaultValue top-right
     */
    position?: ToastPosition | null

    /**
     * DOM element instance where the component should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue self
     */
    //appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement)
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {ToastMessage} message - Clicked message
     */
    //onClick?(message: ToastMessage): void
    /**
     * Callback to invoke when a message is removed.
     * @param {ToastMessage} message - Removed message
     */
    //onRemove?(message: ToastMessage): void
    /**
     * Callback to invoke when message becomes visible.
     */
    //onShow?(): void
    /**
     * Callback to invoke when message becomes hidden.
     */
    //onHide?(): void
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    //children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToastPassThroughOptions}
     */
    pt?: ToastPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions
    /**
     * CSS classes to add to root element
     */
    class?: string | null
    /**
     * CSS classes to add to root element
     */
    style?: CssStyle | null
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Toast component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToastProps extends Omit<HTMLDivAttributes, 'id' | 'style'>, BaseToastProps {}

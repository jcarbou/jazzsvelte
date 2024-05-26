import type {
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughOptions,
    PassThroughType,
    CssStyle,
    IconComponent
} from '@jazzsvelte/api'
import type { SvelteComponent } from 'svelte'

export type MessageInfo = { message: string }
export type ToastPosition = 'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

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
 * Message options for toast component
 */
export interface ToastMessage {
    /**
     * Unique id of the message.
     */
    id: string

    /**
     * Toast group id
     */
    toastId: string

    /**
     * Severity of the message.
     */
    severity?: ToastSeverity | undefined
    /**
     * Summary content of the message.
     */
    summary?: string | undefined
    /**
     * Detail content of the message.  TODO Add slot section
     */
    detail?: string | undefined
    /**
     * Custom content of the message. If enabled, summary and details properties are ignored.
     */
    content?: typeof SvelteComponent | undefined
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean | undefined
    /**
     * Icon of the message.
     */
    icon?: string | undefined
    /**
     * Icon of the close button.
     */
    closeIcon?: string | IconComponent | undefined
    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean | undefined
    /**
     * Delay in milliseconds to close the message automatically.
     * @defaultValue 3000
     */
    life?: number | undefined
    /**
     * Style class of the message.
     */
    class?: string | undefined
    /**
     * Inline style of the message.
     */
    style?: CssStyle | undefined
    /**
     * Style class of the message content.
     */
    contentClassName?: string | undefined
    /**
     * Inline style of the message content.
     */
    contentStyle?: CssStyle | undefined
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {Omit<ToastPassThroughOptions, 'message'>}
     */
    pt?: Omit<ToastPassThroughOptions, 'message'>
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: ToastPassThroughMethodOptions
}

/**
 * Defines current content values and refs for headless development.
 * @see {@link ContentProps.message}
 */
interface ContentPropsMessage {
    /**
     * Summary of the toast.
     * @readonly
     */
    summary: string
    /**
     * Detail of the toast.
     * @readonly
     */
    detail: string
}

/**
 * Defines current content values and refs for headless development.
 * @see {@link ToastProps.content}
 */
export interface ContentProps {
    /**
     * Toast's props values.
     */
    message: ContentPropsMessage
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
     * Specifies a custom content for the toast. For more complex markup, use the "content" slot instead.
     *  @defaultValue null
     */
    content?: typeof SvelteComponent | null
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    ///transitionOptions?: CSSTransitionProps | undefined;
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

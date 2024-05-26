import type {
    PassThroughOptions,
    CssStyle,
    IconComponent,
    PassThroughType,
    PassThroughHTMLAttributes,
    HTMLDivAttributes,
    HTMLSpanAttributes,
    HTMLButtonAttributes
} from '@jazzsvelte/api'
import type { SvelteComponent } from 'svelte'

export type MessageInfo = { message: string }
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export declare type ToastMessagePassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    ToastMessagePassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 */
export interface ToastMessagePassThroughMethodOptions {
    props: ToastMessageProps
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ToastProps.pt}
 */
export interface ToastMessagePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ToastMessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the message's DOM element.
     */
    message?: ToastMessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ToastMessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ToastMessagePassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: ToastMessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the summary's DOM element.
     */
    summary?: ToastMessagePassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the detail's DOM element.
     */
    detail?: ToastMessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButton?: ToastMessagePassThroughType<HTMLButtonAttributes>
    /**
     * Uses to pass attributes to the close button icon's DOM element.
     */
    closeButtonIcon?: ToastMessagePassThroughType<HTMLSpanAttributes>
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    //hooks?: ComponentHooks
    /**
     * Used to control React Transition API.
     */
    // transition?: ToastPassThroughTransitionType;
}

/**
 * Defines message options in Toast component.
 */
export interface BaseToastMessageProps {
    id: string
    /**
     * Severity level of the message.
     * @defaultValue info
     */
    severity?: ToastSeverity | null
    /**
     * Summary content of the message.
     */
    summary?: string | null
    /**
     * Detail content of the message.
     */
    detail?: string | null
    /**
     * Custom content of the message. If enabled, summary and details properties are ignored.
     */
    content?: typeof SvelteComponent | undefined
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean
    /**
     * Icon of the message.
     */
    icon?: string | IconComponent | null
    /**
     * Icon of the close button.
     */
    closeIcon?: string | IconComponent | null
    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean | undefined
    /**
     * Callback to invoke when a message is removed.
     */
    onClose: ((id: string) => void) | null
    /**
     * Callback to invoke when an active message is clicking.
     */
    onClick: ((id: string) => void) | null
    /**
     * Style class of the content.
     */
    contentClass?: string | null
    /**
     * Style of the content.
     */
    contentStyle: CssStyle | null

    /**
     * Delay in milliseconds to close the message automatically.
     */
    //life?: number | undefined
    /**
     * Key of the Toast to display the message.
     */
    //group?: string | undefined
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToastPassThroughOptions}
     */
    pt?: ToastMessagePassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions
    /**
     * Aria label for close button
     */
    ariaCloseLabel?: string | null
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
 * Defines valid properties in Button component. In addition to these, all properties of HTMLButtonElement can be used in this component.
 * @group Properties
 */
export interface ToastMessageProps extends Omit<HTMLButtonAttributes, 'id' | 'style'>, BaseToastMessageProps {}

/**
 * Defines current inline state in Toast component.
 */
export interface ToastState {
    /**
     * Current messages.
     */
    messages: string[]
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
    pt?: Omit<ToastMessagePassThroughOptions, 'message'>
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: ToastMessagePassThroughMethodOptions
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
 * **PrimeReact - Toast**
 *
 * _Toast is used to display messages in an overlay._
 *
 * [Live Demo](https://www.primereact.org/toast/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Toast /*extends SvelteComponent<ToastProps>*/ {
    /**
     * Used to show the message.
     * @param {ToastMessage | ToastMessage[]} message - Message to show
     */
    public show(message: ToastMessage | ToastMessage[]): void
    /**
     * Clears the all messages from Toast.
     */
    public clear(): void
    /**
     * Used to add new messages after removing all old messages.
     * @param {ToastMessage | ToastMessage[]} message - Message to replace
     */
    public replace(message: ToastMessage | ToastMessage[]): void
    /**
     * Used to remove messages.
     * @param {ToastMessage | ToastMessage[]} message - Message to remove
     */
    public remove(message: ToastMessage | ToastMessage[]): void
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement
}

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

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'
export type ToastMessageStatus = { id: string; isClosed: boolean }

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
}

/**
 * Defines message options in Toast component.
 */
export interface BaseToastMessageProps {
    /**
     * Internal property : Unique id of the message.
     */
    id: string
    /**
     * Internal property : Message status
     */
    status: ToastMessageStatus
    /**
     * Internal property : auto close timeout identifier
     */
    timerId?: ReturnType<typeof setTimeout>
    /**
     * Aria label for close button
     */
    ariaCloseLabel?: string | null
    /**
     * CSS classes to add to root element
     */
    class?: string | null
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean
    /**
     * Style class of the content.
     */
    contentClass?: string | null
    /**
     * Style of the content.
     */
    contentStyle?: CssStyle | null
    /**
     * Icon of the close button.
     */
    closeIcon?: string | IconComponent | null
    /**
     * Custom content of the message. If enabled, the given component receives all props and <i>customProps</i> and replace summary and details section.
     */
    customContent?: typeof SvelteComponent | null
    /**
     * Custom message. If enabled, a customMessage is instanciate instead of a ToastMessage.
     */
    customMessage?: typeof SvelteComponent | null
    /**
     * Additional Props for "content"  or "customMessage" SvelteComponent
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customProps?: Record<string, any> | null
    /**
     * Detail content of the message.
     */
    detail?: string | null
    /**
     * Icon of the message.
     */
    icon?: string | IconComponent | null
    /**
     * Callback to invoke when a message is removed.
     */
    onClose?: ((status: ToastMessageStatus) => void) | null
    /**
     * Callback to invoke when an active message is clicking.
     */
    onClick?: ((status: ToastMessageStatus) => void) | null
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
     * Severity level of the message.
     * @defaultValue info
     */
    severity?: ToastSeverity | null
    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean | undefined
    /**
     * CSS classes to add to root element
     */
    style?: CssStyle | null
    /**
     * Summary content of the message.
     */
    summary?: string | null
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

export interface ShowToastProps extends Omit<ToastMessageProps, 'id' | 'status' | 'timerId'> {
    /**
     * Toast group id
     */
    toastId?: string
    /**
     * Delay in milliseconds to close the message automatically.
     * @default 3000
     */
    life?: number | undefined
}

export type StoreToastMessage = ToastMessageProps & {
    /**
     * Toast group id
     */
    toastId: string
    /**
     * Delay in milliseconds to close the message automatically.
     * @default 3000
     */
    life?: number | undefined
}

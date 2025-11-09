import type {
    CssObject,
    HTMLDivAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    HTMLButtonAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    IconComponent,
    TransitionFactory
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

export type MessagesMessageState = { id: number; message: MessagesMessage }

export interface MessagesMessageSnippetProps {
    messageState: MessagesMessageState
}

export type MessagesMessageSeverity = 'error' | 'success' | 'secondary' | 'info' | 'warn' | 'contrast'
export type MessagesMessageContentSnippet = Snippet<[MessagesMessageSnippetProps]>
export type MessagesMessageSummarySnippet = Snippet<[MessagesMessageSnippetProps]>
export type MessagesMessageDetailSnippet = Snippet<[MessagesMessageSnippetProps]>

export interface MessagesMessage {
    /**
     * Severity level of the message.
     * @default  null
     */
    severity?: MessagesMessageSeverity

    /**
     * Custom template of the message.
     * @default  null
     */
    content?: string | null

    /**
     * Custom template of the message.
     * @default  null
     */
    contentSnippet?: MessagesMessageContentSnippet | null

    /**
     * Summary content of the message.
     * @default  null
     */
    summary?: string | null

    /**
     * Summary content of the message.
     * @default  null
     */
    summarySnippet?: MessagesMessageSummarySnippet | null

    /**
     * Detail content of the message.
     * @default  null
     */
    detail?: string | null

    /**
     * Detail content of the message.
     * @default  null
     */
    detailSnippet?: MessagesMessageDetailSnippet | null

    /***
     * Whether the message can be closed manually using the close icon.
     */
    closable?: boolean

    /**
     * Icon of the close button..
     * @default  based on severity
     */
    closeIcon?: string | IconComponent | null

    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean

    /**
     * Delay in milliseconds to close the message automatically.
     */
    life?: number

    /**
     * Icon for the message. If not set it will default to severity icon.
     * @default  based on severity
     */
    icon?: string | IconComponent | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    ///pt?: MessagesPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    //ptOptions?: PassThroughOptions | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    //unstyled?: boolean
}

/**
 * undefined
 * @group baseProperties
 */
export interface BaseMessagesProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: MessagesPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * The properties of CSSTransition can be customized.
     * @default  null
     */
    transition?: TransitionFactory

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Callback to invoke when a message gets clicked.
     */
    onClick?: ((messageState: MessagesMessageState) => void) | null

    /**
     * Callback to invoke when a message is removed.
     */
    onRemove?: ((messageState: MessagesMessageState) => void) | null
}

export interface UIMessageProps {
    messageState: MessagesMessageState
    onClick: ((messageState: MessagesMessageState) => void) | null
    onClose: (messageState: MessagesMessageState) => void

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: MessagesPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * The properties of CSSTransition can be customized.
     * @default  null
     */
    transition: TransitionFactory

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Messages component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface MessagesProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseMessagesProps {}

/**
 * @group ptType
 */
export declare type MessagesPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, MessagesPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface MessagesPassThroughMethodOptions {
    props: MessagesProps
}

export interface MessagesPtContext extends MessagesPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface UIMessagePassThroughMethodOptions {
    props: UIMessageProps
}

export interface UIMessagePtContext extends UIMessagePassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface MessagesPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MessagesPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: MessagesPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MessagesPassThroughType<HTMLSpanAttributes> | MessagesPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the summary's DOM element.
     */
    summary?: MessagesPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the detail's DOM element.
     */
    detail?: MessagesPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the button's DOM element.
     */
    button?: MessagesPassThroughType<HTMLButtonAttributes>
    /**
     * Uses to pass attributes to the button icon's DOM element.
     */
    buttonIcon?: MessagesPassThroughType<HTMLSpanAttributes> | MessagesPassThroughType<HTMLSVGAttributes>
}

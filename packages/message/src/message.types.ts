import type {
    CssObject,
    HTMLDivAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

export interface MessageContentSnippetProps {
    props: BaseMessageProps
}

/**
 * Types used by properties of the Message component.
 * @group types
 **/
export type MessageSeverity = 'error' | 'success' | 'secondary' | 'info' | 'warn' | 'contrast'
export type MessageContentSnippet = Snippet<[MessageContentSnippetProps]>
export type MessageTextSnippet = Snippet<[]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseMessageProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Custom template of the message.
     * @default  null
     */
    content?: string | null

    /**
     * Custom template of the message.
     * @default  null
     */
    contentSnippet?: MessageContentSnippet | null

    /**
     * Icon for the message. If not set it will default to severity icon.
     * @default  based on severity
     */
    icon?: string | IconComponent | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: MessagePassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Severity level of the message.
     * @default  null
     */
    severity?: MessageSeverity

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Text of the message.
     * @default  null
     */
    textSnippet?: MessageTextSnippet | null

    /**
     * Text of the message.
     * @default  null
     */
    text?: string | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Message component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface MessageProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseMessageProps {}

/**
 * @group ptType
 */
export declare type MessagePassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, MessagePassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface MessagePassThroughMethodOptions {
    props: MessageProps
}

export interface MessagePtContext extends MessagePassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface MessagePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MessagePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MessagePassThroughType<HTMLSpanAttributes> | MessagePassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: MessagePassThroughType<HTMLSpanAttributes>
}

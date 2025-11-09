import type {
    CssObject,
    HTMLSpanAttributes,
    HTMLSVGAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

/**
 * Types used by properties of the Tag component.
 * @group types
 **/
export type TagSeverity = null | 'success' | 'warning' | 'secondary' | 'info' | 'danger' | 'contrast'

export type TagValueSnippetProps = { props: TagProps }
export type TagValueSnippet = Snippet<[TagValueSnippetProps]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseTagProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Icon of the tag to display next to the value.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: TagPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Whether the corners of the tag are rounded.
     * @default  false
     */
    rounded?: boolean

    /**
     * Severity type of the tag.
     * @default  null
     */
    severity?: TagSeverity

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Value Snippet to display inside the tag.
     * @default  null
     */
    valueSnippet?: TagValueSnippet | null

    /**
     * Value to display inside the tag.
     * @default  null
     */
    value?: string | null
}

/**
 * Defines valid properties in Tag component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group properties
 */
export interface TagProps extends Omit<HTMLSpanAttributes, 'style' | 'class'>, BaseTagProps {}

/**
 * @group ptType
 */
export declare type TagPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, TagPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface TagPassThroughMethodOptions {
    props: TagProps
}

export interface TagPtContext extends TagPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface TagPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TagPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: TagPassThroughType<HTMLSpanAttributes> | TagPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the value's DOM element.
     */
    value?: TagPassThroughType<HTMLSpanAttributes>
}

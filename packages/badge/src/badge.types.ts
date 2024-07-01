import type { HTMLAttributes } from 'svelte/elements'
import type {
    CssStyle,
    HTMLSpanAttributes,
    PassThroughHTMLAttributes,
    PassThroughOptions,
    PassThroughType
} from '@jazzsvelte/api'

/**
 * Value to display inside the badge.
 *
 */
export type BadgeValue = string | number | null | undefined

/**
 * Severity type of the badge.
 * @defaultValue null
 */
export type BadgeSeverity = 'success' | 'info' | 'warning' | 'danger'

/**
 * Size of the badge, valid options are "large" and "xlarge".
 * @defaultValue null
 */
export type BadgeSize = 'normal' | 'medium' | 'large' | 'xlarge'

/**
 * Defines valid properties in Badge component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface BaseBadgeProps {
    /**
     * Value to display inside the badge.
     *
     */
    value?: BadgeValue
    /**
     * Severity type of the badge.
     * @defaultValue null
     */
    severity?: BadgeSeverity | null
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @defaultValue null
     */
    size?: BadgeSize | null
    /**
     * CSS classes to add to root element
     */
    class?: string | null
    /**
     * CSS classes to add to root element
     */
    style?: CssStyle | null
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {BadgePassThroughOptions}
     */
    pt?: BadgePassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Badge component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'>, BaseBadgeProps {}

/**
 * Custom passthrough(pt) option method.
 */
export interface BadgePassThroughMethodOptions {
    props: BadgeProps
}

export declare type BadgePassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, BadgePassThroughMethodOptions>

/**
 * Custom passthrough(pt) options.
 * @see {@link BadgeProps.pt}
 */
export interface BadgePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BadgePassThroughType<HTMLSpanAttributes>
}

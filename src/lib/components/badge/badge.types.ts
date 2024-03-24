import type { HTMLAttributes } from 'svelte/elements'
import type { PassThroughHTMLAttributes, PassThroughOptions, PassThroughType } from '../utils/utils.types'

/**
 * Value to display inside the badge.
 *
 */
export type BadgeValue = string | number | null | undefined

/**
 * Severity type of the badge.
 * @defaultValue null
 */
export type BadgeSeverity = 'success' | 'info' | 'warning' | 'danger' | null | undefined

/**
 * Size of the badge, valid options are "large" and "xlarge".
 * @defaultValue null
 */
export type BadgeSize = 'normal' | 'large' | 'xlarge' | null | undefined

/**
 * Defines valid properties in Badge component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Value to display inside the badge.
     *
     */
    value?: BadgeValue
    /**
     * Severity type of the badge.
     * @defaultValue null
     */
    severity?: BadgeSeverity
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @defaultValue null
     */
    size?: BadgeSize
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
 * Custom passthrough(pt) option method.
 */
export interface BadgePassThroughMethodOptions {
    props: BadgeProps
}

export declare type BadgePassThroughType<T> = PassThroughType<T, BadgePassThroughMethodOptions>

export type RootHTMLAttributes = HTMLAttributes<HTMLSpanElement>

/**
 * Custom passthrough(pt) options.
 * @see {@link BadgeProps.pt}
 */
export interface BadgePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BadgePassThroughType<PassThroughHTMLAttributes<RootHTMLAttributes>>
}

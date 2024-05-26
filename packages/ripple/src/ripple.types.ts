import type { HTMLAttributes } from 'svelte/elements'
import type { CssStyle, HTMLSpanAttributes, PassThroughHTMLAttributes, PassThroughType } from '@jazzsvelte/api'

/**
 * Defines valid properties in Ripple component.
 * @group Properties
 */
export interface BaseRippleProps {
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
 * Defines valid properties in Ripple component.
 * @group Properties
 */
export interface RippleProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'>, BaseRippleProps {}

/**
 * Custom passthrough(pt) option method.
 */
export interface RipplePassThroughMethodOptions {
    props: RippleProps
}

export declare type RipplePassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, RipplePassThroughMethodOptions>

/**
 * Custom passthrough(pt) options.
 * @see {@link RippleProps.pt}
 */
export interface RipplePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RipplePassThroughType<HTMLSpanAttributes>
}

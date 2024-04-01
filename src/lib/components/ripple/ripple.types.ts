import type { HTMLAttributes } from 'svelte/elements'
import type { HTMLSpanAttributes, PassThroughHTMLAttributes, PassThroughOptions, PassThroughType } from '../utils/utils.types'

/**
 * Defines valid properties in Ripple component.
 * @group Properties
 */
export interface RippleProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {RipplePassThroughOptions}
     */
    pt?: RipplePassThroughOptions
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
export interface RipplePassThroughMethodOptions {
    props: RippleProps
}

export declare type RipplePassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, RipplePassThroughMethodOptions>

export type RootHTMLAttributes = HTMLSpanAttributes

/**
 * Custom passthrough(pt) options.
 * @see {@link RippleProps.pt}
 */
export interface RipplePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RipplePassThroughType<RootHTMLAttributes>
}

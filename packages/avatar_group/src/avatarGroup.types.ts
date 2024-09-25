import type { CssObject, HTMLDivAttributes, PassThroughHTMLAttributes, PassThroughType } from '@jazzsvelte/api'

/**
 * Custom passthrough(pt) option method.
 */
export interface AvatarGroupPassThroughMethodOptions {
    props: AvatarGroupProps
}

/**
 * undefined
 * @group baseProperties
 */
export interface BaseAvatarGroupProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: AvatarGroupPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: AvatarGroupPassThroughMethodOptions

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
}

/**
 * Defines valid properties in Avatar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface AvatarGroupProps extends Omit<HTMLDivAttributes, 'style'>, BaseAvatarGroupProps {}

/**
 * @group ptType
 */
export declare type AvatarGroupPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    AvatarGroupPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface AvatarGroupPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AvatarGroupPassThroughType<HTMLDivAttributes>
}

import type {
    CssObject,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'

/**
 * Types used by properties of the Skeleton component.
 * @group types
 **/
export type SkeletonShape = 'circle' | 'rectangle'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseSkeletonProps {
    /**
     * Type of the animation, valid options are "wave" and "none".
     * @default  wave
     */
    animation?: 'none' | 'wave'

    /**
     * Border radius of the element, defaults to value from theme.
     * @default  null
     */
    borderRadius?: string | null

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Height of the element.
     * @default  1rem
     */
    height?: string | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: SkeletonPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @default  rectangle
     */
    shape?: SkeletonShape

    /**
     * Size of the Circle or Square.
     * @default  null
     */
    size?: string | null

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
     * Width of the element.
     * @default  100%
     */
    width?: string | null
}

/**
 * Defines valid properties in Skeleton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface SkeletonProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseSkeletonProps {}

/**
 * @group ptType
 */
export declare type SkeletonPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, SkeletonPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface SkeletonPassThroughMethodOptions {
    props: SkeletonProps
}

export interface SkeletonPtContext extends SkeletonPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface SkeletonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SkeletonPassThroughType<HTMLDivAttributes>
}

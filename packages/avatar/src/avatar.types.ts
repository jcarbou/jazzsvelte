import type {
    CssObject,
    HTMLDivAttributes,
    HTMLSpanAttributes,
    HTMLSVGAttributes,
    HTMLImageAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    OnEvent,
    OnImageError
} from '@jazzsvelte/api'

/**
 * Types used by properties of the Avatar component.
 * @group types
 **/
export type AvatarShape = 'square' | 'circle'
export type AvatarSize = 'normal' | 'large' | 'xlarge'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseAvatarProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Defines the icon to display.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Defines the image to display.
     * @default  null
     */
    image?: string | null

    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @default  avatar
     */
    imageAlt?: string | null

    /**
     * Defines a fallback image or URL if the main image fails to load. If "default" will fallback to label then icon.
     * @default  default
     */
    imageFallback?: string | null

    /**
     * Defines the text to display.
     * @default  null
     */
    label?: string | null

    /**
     * Callback to invoke on click.
     */
    onClick?: OnEvent

    /**
     * This event is triggered if an error occurs while loading an image file.
     */
    onImageError?: OnImageError

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: AvatarPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: AvatarPassThroughMethodOptions

    /**
     * Shape of the element ('square' | 'circle').
     * @default  square
     */
    shape?: AvatarShape

    /**
     * Size of the element ('normal' | 'large' | 'xlarge').
     * @default  normal
     */
    size?: AvatarSize

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
export interface AvatarProps extends Omit<HTMLDivAttributes, 'style'>, BaseAvatarProps {}

/**
 * @group ptType
 */
export declare type AvatarPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, AvatarPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface AvatarPassThroughMethodOptions {
    props: AvatarProps
    state: AvatarState
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface AvatarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AvatarPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: AvatarPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: AvatarPassThroughType<HTMLSpanAttributes> | AvatarPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the image's DOM element.
     */
    image?: AvatarPassThroughType<HTMLImageAttributes>
}

/**
 * Defines current state of Avatar component.
 * @group state
 */
export interface AvatarState {
    /**
     * Current imageFailed state as a boolean.
     */
    imageFailed: boolean
    /**
     * Current state that indicates whether the Avatar component is nested within an AvatarGroup component.
     */
    isNestedInAvatarGroup: boolean
}

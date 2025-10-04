import type {
    CssObject,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    HTMLSVGAttributes,
    HTMLSVGCircleAttributes
} from '@jazzsvelte/api'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseProgressSpinnerProps {
    /**
     * Duration of the rotate animation.
     * @default  2s
     */
    animationDuration?: string | null

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Color for the background of the circle.
     * @default  null
     */
    fill?: string | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: ProgressSpinnerPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Width of the circle stroke.
     * @default  2
     */
    strokeWidth?: string | null

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
 * Defines valid properties in ProgressSpinner component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface ProgressSpinnerProps extends Omit<HTMLDivAttributes, 'style'>, BaseProgressSpinnerProps {}

/**
 * @group ptType
 */
export declare type ProgressSpinnerPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    ProgressSpinnerPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ProgressSpinnerPassThroughMethodOptions {
    props: ProgressSpinnerProps
}

export interface ProgressSpinnerPtContext extends ProgressSpinnerPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ProgressSpinnerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ProgressSpinnerPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the spinner's DOM element.
     */
    spinner?: ProgressSpinnerPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the circle's DOM element.
     */
    circle?: ProgressSpinnerPassThroughType<HTMLSVGCircleAttributes>
}

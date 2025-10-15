import type {
    CssObject,
    HTMLButtonAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    TransitionFactory
} from '@jazzsvelte/api'

/**
 * Types used by properties of the ScrollTop component.
 * @group types
 **/
export type ScrollTopBehavior = 'auto' | 'smooth'
export type ScrollTopTarget = 'window' | 'parent'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseScrollTopProps {
    /**
     * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
     * @default  smooth
     */
    behavior?: ScrollTopBehavior

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Name of the icon or IconComponent for icon.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Callback to invoke when overlay becomes hidden.
     * @returns callback
     */
    onHide?: (() => void) | null

    /**
     * Callback to invoke when overlay panel becomes visible.
     * @returns callback
     */
    onShow?: (() => void) | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: ScrollTopPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Inline style of the component.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Target of the ScrollTop, valid values are "window" and "parent".
     * @default  window
     */
    target?: ScrollTopTarget

    /**
     * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
     * @default  400
     */
    threshold?: number

    /**
     * The properties of CSSTransition can be customized.
     * @default  null
     */
    transition?: TransitionFactory

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in ScrollTop component.
 * @group properties
 */
export interface ScrollTopProps extends Omit<HTMLButtonAttributes, 'style'>, BaseScrollTopProps {}

/**
 * @group ptType
 */
export declare type ScrollTopPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ScrollTopPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ScrollTopPassThroughMethodOptions {
    props: ScrollTopProps
    state: ScrollTopState
}

export interface ScrollTopPtContext extends ScrollTopPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ScrollTopPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ScrollTopPassThroughType<HTMLButtonAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ScrollTopPassThroughType<HTMLSpanAttributes> | ScrollTopPassThroughType<HTMLSVGAttributes>
    /**
     * Used to control React Transition API.
     */
    //transition?: ScrollTopPassThroughType<HTMLScrollTopPassThrouAttributes>
}

/**
 * Defines current state of ScrollTop component.
 * @group state
 */
export interface ScrollTopState {
    /**
     * Current visible state as a boolean.
     */
    visible: boolean
}

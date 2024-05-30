import type { SvelteComponent } from 'svelte'
import type {
    CssObject,
    MenuItem,
    HTMLDivAttributes,
    HTMLLIAttributes,
    HTMLAnchorAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    HTMLULAttributes
} from '@jazzsvelte/api'
import { ButtonPassThroughOptions } from '@jazzsvelte/button'

/**
 * Defines types used by properties of the SpeedDial component.
 * @group types
 **/
export type SpeedDialDirection = 'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right' | 'down-left' | 'down-right'
export type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle'

export type SpeedDialContext = {
    onItemClick: (e: MouseEvent, item: MenuItem) => void
    hide: () => void
}

/**
 * undefined
 * @group baseProperties
 */
export interface BaseSpeedDialProps {
    /**
     * Style class of the button element.
     * @default  null
     */
    buttonClass?: string | null

    /**
     * Inline style of the button element.
     * @default  null
     */
    buttonStyle?: string | CssObject | null

    /**
     * Template of button element.
     * @default  null
     */
    buttonTemplate?: typeof SvelteComponent | null

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Specifies the opening direction of actions. Valid values are 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left' and 'down-right'
     * @default  'up'
     */
    direction?: 'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | null

    /**
     * Whether the component is disabled.
     * @default  false
     */
    disabled?: boolean

    /**
     * Hide icon of the button element.
     * @default  null
     */
    hideIcon?: string | IconComponent | null

    /**
     * Whether the actions close when clicked outside.
     * @default  true
     */
    hideOnClickOutside?: boolean

    /**
     * Whether to show a mask element behind the speeddial.
     * @default  false
     */
    mask?: boolean

    /**
     * Style class of the mask element.
     * @default  null
     */
    maskClass?: string | null

    /**
     * Inline style of the mask element.
     * @default  null
     */
    maskStyle?: string | CssObject | null

    /**
     * MenuModel instance to define the action items.
     * @default  null
     */
    model?: MenuItem[]

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: SpeedDialPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: SpeedDialPassThroughMethodOptions

    /**
     * Radius for *circle types.
     * @default  0
     */
    radius?: number

    /**
     * Defined to rotate showIcon when hideIcon is not present.
     * @default  true
     */
    rotateAnimation?: boolean

    /**
     * Show icon of the button element.
     * @default  null
     */
    showIcon?: string | IconComponent | null

    /**
     * Transition delay step for each action item.
     * @default  30
     */
    transitionDelay?: number

    /**
     * Specifies the opening type of actions.
     * @default  'linear'
     */
    type?: 'linear' | 'circle' | 'semi-circle' | 'quarter-circle'

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
     * Specifies the visibility of the overlay.
     * @default  false
     */
    visible?: boolean
}

/**
 * Defines valid properties in SpeedDial component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface SpeedDialProps extends Omit<HTMLDivAttributes, 'style'>, BaseSpeedDialProps {}

/**
 * @group ptType
 */
export declare type SpeedDialPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, SpeedDialPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface SpeedDialPassThroughMethodOptions {
    props: SpeedDialProps
    state: SpeedDialState
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface SpeedDialPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SpeedDialPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the Button component.
     */
    button?: ButtonPassThroughOptions
    /**
     * Uses to pass attributes to the menu's DOM element.
     */
    menu?: SpeedDialPassThroughType<HTMLULAttributes>
    /**
     * Uses to pass attributes to the menu item's DOM element.
     */
    menuitem?: SpeedDialPassThroughType<HTMLLIAttributes>
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: SpeedDialPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the action icon's DOM element.
     */
    actionIcon?: SpeedDialPassThroughType<HTMLSpanAttributes> | SpeedDialPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: SpeedDialPassThroughType<HTMLDivAttributes>
}

/**
 * Defines current state of SpeedDial component.
 * @group state
 */
export interface SpeedDialState {
    /**
     * Current visible state as a boolean.
     */
    visible: boolean
}

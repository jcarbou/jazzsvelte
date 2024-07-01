import type { TooltipOptions } from '@jazzsvelte/tooltip'

import type {
    CssObject,
    HTMLDivAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    HTMLULAttributes,
    HTMLLIAttributes,
    HTMLAnchorAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    MenuItem
} from '@jazzsvelte/api'
import { ButtonProps, ButtonSeverity } from '@jazzsvelte/button'

/**
 * Defines types used by properties of the SplitButton component.
 * @group types
 **/
export type SplitButtonSize = 'small' | 'normal' | 'large'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseSplitButtonProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * ClassName of the button.
     * @default  null
     */
    buttonClass?: string | null

    /**
     * Props for the main button, any prop is passed implicity to the button element.
     * @default  null
     */
    buttonProps?: ButtonProps | null

    /**
     * When present, it specifies that the component should be disabled.
     * @default  false
     */
    disabled?: boolean

    /**
     * Name of the dropdown icon or JSX.Element for dropdown icon.
     * @default  null
     */
    dropdownIcon?: string | IconComponent | null

    /**
     * Name of the icon.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Text of the button.
     * @default  null
     */
    label?: string | null

    /**
     * Display loading icon of the button
     * @default  false
     */
    loading?: boolean

    /**
     * Name of the loading icon or JSX.Element for loading icon.
     * @default  null
     */
    loadingIcon?: string | IconComponent | null

    /**
     * ClassName of the menu dropdown button.
     * @default  null
     */
    menuButtonClass?: string | null

    /**
     * Props for the dropdown button, any prop is passed implicity to the dropdown button element.
     * @default  null
     */
    menuButtonProps?: ButtonProps | null

    /**
     * Name of the menu icon.
     * @default  null
     */
    menuIcon?: string | IconComponent | null

    /**
     * ClassName class of the overlay menu.
     * @default  null
     */
    menuClass?: string | null

    /**
     * Inline style of the overlay menu.
     * @default  null
     */
    menuStyle?: string | CssObject | null

    /**
     * MenuModel instance to define the overlay items.
     * @default  null
     */
    model?: MenuItem[]

    /**
     * Add a border class without a background initially.
     * @default  false
     */
    outlined?: boolean

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: SplitButtonPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: SplitButtonPassThroughMethodOptions

    /**
     * Add a shadow to indicate elevation.
     * @default  false
     */
    raised?: boolean

    /**
     * Add a circular border radius to the button.
     * @default  false
     */
    rounded?: boolean

    /**
     * Defines the style of the button, valid values are "secondary", "success", "info", "warning", "danger", "contrast".
     * @default  null
     */
    severity?: ButtonSeverity | null

    /**
     * Defines the size of the button, valid values are "small" and "large".
     * @default  null
     */
    size?: 'small' | 'normal' | 'large' | null

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Add a textual class to the button without a background initially.
     * @default  false
     */
    text?: boolean

    /**
     * Content of the tooltip.
     * @default  null
     */
    tooltip?: string | null

    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @default  null
     */
    tooltipOptions?: TooltipOptions | null

    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @default  null
     */
    //transitionOptions?: CSSTransitionProps

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * When present, it specifies that the element should be visible.
     * @default  true
     */
    visible?: boolean
}

/**
 * Defines valid properties in SplitButton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface SplitButtonProps extends Omit<HTMLDivAttributes, 'style'>, BaseSplitButtonProps {}

/**
 * @group ptType
 */
export declare type SplitButtonPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    SplitButtonPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface SplitButtonPassThroughMethodOptions {
    props: SplitButtonProps
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface SplitButtonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SplitButtonPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: SplitButtonPassThroughType<HTMLSpanAttributes> | SplitButtonPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the Button component.
     */
    button?: SplitButtonPassThroughType<ButtonProps>
    /**
     * Uses to pass attributes to the Button component.
     */
    menuButton?: SplitButtonPassThroughType<ButtonProps>
    /**
     * Uses to pass attributes to the menu's DOM element.
     */
    menu?: SplitButtonPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the menu list's DOM element.
     */
    menuList?: SplitButtonPassThroughType<HTMLULAttributes>
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: SplitButtonPassThroughType<HTMLLIAttributes>
    /**
     * Uses to pass attributes to the menu icon's DOM element.
     */
    menuIcon?: SplitButtonPassThroughType<HTMLSpanAttributes> | SplitButtonPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the menu label's DOM element.
     */
    menuLabel?: SplitButtonPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the anchor's DOM element.
     */
    anchor?: SplitButtonPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the menu item's DOM element.
     */
    menuItem?: SplitButtonPassThroughType<HTMLLIAttributes>

    /**
     * Used to control React Transition API.
     */
    //transition?: SplitButtonPassThroughType<HTMLSplitButtonPassThrAttributes>
}

/**
 * Defines current state of SplitButton component.
 * @group state
 */
export interface SplitButtonState {
    /**
     * Current id state as a boolean.
     */
    id: string
    /**
     * Current overlay visible state as a boolean.
     */
    overlayVisible: boolean
}

import type { TooltipOptions } from '@jazzsvelte/tooltip'
import type {
    CssObject,
    HTMLButtonAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType
} from '@jazzsvelte/api'

/**
 * Defines types used by properties of the Button component.
 * @group types
 **/
export type ButtonIconPos = 'top' | 'bottom' | 'left' | 'right'
export type ButtonSeverity = 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast'
export type ButtonSize = 'small' | 'normal' | 'large'

/**
 * Defines valid properties in Button component.
 * @group baseProperties
 */
export interface BaseButtonProps {
    /**
     * Value of the badge.
     * @default  null
     */
    badge?: string | null

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * When present, it specifies that the element should be disabled.
     * @default  false
     */
    disabled?: boolean

    /**
     * Name of the icon or JSX.Element for icon.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Position of the icon, valid values are "left", "right", "top" and "bottom".
     * @default  left
     */
    iconPos?: ButtonIconPos | null

    /**
     * Text of the button.
     * @default  null
     */
    label?: string | null

    /**
     * Add a link style to the button.
     * @default  false
     */
    link?: boolean

    /**
     * Display loading icon of the button
     * @default  false
     */
    loading?: boolean

    /**
     * Name of the loading icon or JSX.Element for loading icon.
     * @default  SpinnerIcon
     */
    loadingIcon?: string | IconComponent | null

    /**
     * Add a border class without a background initially.
     * @default  false
     */
    outlined?: boolean

    /**
     * Add a plain textual class to the button without a background initially.
     * @default  false
     */
    plain?: boolean

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: ButtonPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: ButtonPassThroughMethodOptions

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
     * Defines the style of the button, valid values are "secondary", "success", "info", "warning", "danger", "help".
     * @default  null
     */
    severity?: ButtonSeverity | null

    /**
     * Defines the size of the button, valid values are "small" and "large".
     * @default  null
     */
    size?: ButtonSize | null

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
 * Defines valid properties in Button component. In addition to these, all properties of HTMLButtonElement can be used in this component.
 * @group properties
 */
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'disabled' | 'style'>, BaseButtonProps {}

/**
 * @group ptType
 */
export declare type ButtonPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ButtonPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ButtonPassThroughMethodOptions {
    props: ButtonProps
    context: ButtonContext
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ButtonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ButtonPassThroughType<HTMLButtonAttributes>
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: ButtonPassThroughType<HTMLSpanAttributes> | ButtonPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ButtonPassThroughType<HTMLSpanAttributes> | ButtonPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ButtonPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the badge's DOM element.
     */
    badge?: ButtonPassThroughType<HTMLSpanAttributes>
}

/**
 * Defines current options in Button component.
 * @group ptContextOption
 */
export interface ButtonContext {
    /**
     * Current disabled state of the element as a boolean.
     */
    disabled: boolean
}

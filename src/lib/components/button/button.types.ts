import type { TooltipOptions } from '../tooltip/tooltipOptions.types'
import type {
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    HTMLSpanOrSvgAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType
} from '../utils/utils.types'
import type { HTMLButtonAttributes } from 'svelte/elements'

export type ButtonSize = 'small' | 'normal' | 'large' | undefined
export type IconPos = 'top' | 'bottom' | 'left' | 'right' | undefined

export type ButtonGroupContext = {
    disabled: boolean
    rounded: boolean
    outlined: boolean
    size: ButtonSize
    iconPos: IconPos
}

/**
 * Defines valid properties in Button component. In addition to these, all properties of HTMLButtonElement can be used in this component.
 * @group Properties
 */
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'disabled'> {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    //children?: HTMLElement | undefined
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined
    /**
     * Name of the icon or JSX.Element for icon.
     */
    icon?: string | undefined
    /**
     * Add a textual class to the button without a background initially.
     * @defaultValue false
     */
    text?: boolean | undefined
    /**
     * Add a circular border radius to the button.
     * @defaultValue false
     */
    rounded?: boolean | undefined
    /**
     * Add a shadow to indicate elevation.
     * @defaultValue false
     */
    raised?: boolean | undefined
    /**
     * Add a border class without a background initially.
     * @defaultValue false
     */
    outlined?: boolean | undefined
    /**
     * Add a link style to the button.
     * @defaultValue false
     */
    link?: boolean | undefined
    /**
     * Defines the style of the button, valid values are "secondary", "success", "info", "warning", "danger", "help".
     */
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | undefined
    /**
     * Defines the size of the button, valid values are "small" and "large".
     */
    size?: ButtonSize
    /**
     * Position of the icon, valid values are "left", "right", "top" and "bottom".
     * @defaultValue left
     */
    iconPos?: IconPos
    /**
     * Text of the button.
     */
    label?: string | undefined
    /**
     * Display loading icon of the button
     * @defaultValue false
     */
    loading?: boolean | undefined
    /**
     * Name of the loading icon or JSX.Element for loading icon.
     */
    loadingIcon?: string | IconComponent | undefined
    /**
     * Add a plain textual class to the button without a background initially.
     * @defaultValue false
     */
    plain?: boolean | undefined
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined
    /**
     * When present, it specifies that the element should be visible.
     * @defaultValue true
     */
    visible?: boolean | undefined
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ButtonPassThroughOptions}
     */
    pt?: ButtonPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: ButtonPassThroughMethodOptions
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean
}

export declare type ButtonPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ButtonPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 */
export interface ButtonPassThroughMethodOptions {
    props: ButtonProps
    context: ButtonContext
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ButtonProps.pt}
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
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    //tooltip?: TooltipPassThroughOptions
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    ///lifecycle?: ComponentLifecycle
}

/**
 * Defines current options in Button component.
 */
export interface ButtonContext {
    /**
     * Current disabled state of the element as a boolean.
     * @defaultValue false
     */
    disabled: boolean
}

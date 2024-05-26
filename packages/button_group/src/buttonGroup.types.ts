import type { CssStyle, HTMLSpanAttributes, PassThroughHTMLAttributes, PassThroughType } from '@jazzsvelte/api'
import { ButtonIconPos, ButtonSeverity, ButtonSize } from '@jazzsvelte/button'
import type { HTMLAttributes } from 'svelte/elements'

/**
 * Defines valid properties in Button Group component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface BaseButtonGroupProps {
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean
    /**
     * Add a circular border radius to the button.
     * @defaultValue false
     */
    rounded?: boolean
    /**
     * Add a shadow to indicate elevation.
     * @defaultValue false
     */
    raised?: boolean
    /**
     * Add a border class without a background initially.
     * @defaultValue false
     */
    outlined?: boolean
    /**
     * Defines the style of the button, valid values are "secondary", "success", "info", "warning", "danger", "help".
     */
    severity?: ButtonSeverity | null
    /**
     * Defines the size of the button, valid values are "small" and "large".
     */
    size?: ButtonSize | null
    /**
     * Position of the icon, valid values are "left", "right", "top" and "bottom".
     * @defaultValue left
     */
    iconPos?: ButtonIconPos | null
    /**
     * When present, it specifies that the element should be visible.
     * @defaultValue true
     */
    visible?: boolean
    /**
     * CSS classes to add to root element
     */
    class?: string | null
    /**
     * CSS classes to add to root element
     */
    style?: CssStyle | null
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ButtonGroupPassThroughOptions}
     */
    pt?: ButtonGroupPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: ButtonGroupPassThroughMethodOptions
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Button Group component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'disabled' | 'style'>, BaseButtonGroupProps {}

export declare type ButtonGroupPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    ButtonGroupPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 */
export interface ButtonGroupPassThroughMethodOptions {
    props: ButtonGroupProps
    context: ButtonGroupContext
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ButtonProps.pt}
 */
export interface ButtonGroupPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ButtonGroupPassThroughType<HTMLSpanAttributes>
}

/**
 * Defines current options in Button component.
 */
export interface ButtonGroupContext {
    /**
     * Current disabled state of the element as a boolean.
     * @defaultValue false
     */
    disabled: boolean
}

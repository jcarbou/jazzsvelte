import type { CssStyle, HTMLInputAttributes, PassThroughHTMLAttributes, PassThroughType } from '@jazzsvelte/api'
import type { KeyFilterRegExp, ValidatedInputEvent } from '@jazzsvelte/key_filter_action'
import type { TooltipOptions } from '@jazzsvelte/tooltip'

export interface InputTextEvent {
    validatedinput: ValidatedInputEvent
}

/**
 * Defines valid properties in InputText component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface BaseInputTextProps {
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean
    /**
     * Format definition of the keys to block.
     * @defaultValue null
     */
    keyFilter?: KeyFilterRegExp | null
    /**
     * Size of the input.
     */
    size?: number | null
    /**
     * Content of the tooltip.
     */
    tooltip?: string | null
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | null
    /**
     * When enabled, instead of blocking keys, input is validated internally to test against the regular expression.
     * @defaultValue false
     */
    validateOnly?: boolean
    /**
     * The value of component
     */
    value?: string
    /**
     * Callback to invoke while typing value on input
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     * @param {boolean} validatePattern - Whether to validate the value
     */
    //onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputTextPassThroughOptions}
     */
    pt?: InputTextPassThroughOptions
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: InputTextPassThroughMethodOptions
    /**
     * CSS classes to add to root element
     */
    class?: string | null
    /**
     * CSS classes to add to root element
     */
    style?: CssStyle | null
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in InputText component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface InputTextProps extends Omit<HTMLInputAttributes, 'onInput' | 'value' | 'size' | 'style'>, BaseInputTextProps {}

export declare type InputTextPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, InputTextPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 */
export interface InputTextPassThroughMethodOptions {
    props: InputTextProps
    context: InputTextContext
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputTextProps.pt}
 */
export interface InputTextPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputTextPassThroughType<HTMLInputAttributes>
    /**
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    //tooltip?: TooltipPassThroughOptions
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    //hooks?: ComponentHooks
}

/**
 * Defines current options in InputText component.
 */
export interface InputTextContext {
    /**
     * Current disabled state of the component as a boolean.
     * @defaultValue false
     */
    disabled: boolean
}

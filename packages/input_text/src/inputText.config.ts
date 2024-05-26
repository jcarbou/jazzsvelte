import { BaseInputTextProps, InputTextPassThroughOptions } from './inputText.types'

/**
 * Global Pass Through options (for all InputTexts)
 */
export let globalInputTextPT: InputTextPassThroughOptions | null

/**
 * Set global Pass Through options (for all InputTexts)
 * @param options
 */
export function inputTextPT(options: InputTextPassThroughOptions) {
    globalInputTextPT = options
}

/**
 * Default InputTexts  props
 */
export const defaultInputTextProps: Omit<Required<BaseInputTextProps>, 'pt' | 'ptOptions'> = {
    disabled: false,
    invalid: false,
    keyFilter: null,
    tooltip: null,
    tooltipOptions: null,
    validateOnly: false,
    value: '',
    size: null,
    unstyled: false,
    class: null,
    style: null
}

/**
 * Set global Pass Through options (for all InputTexts)
 * @param options
 */
export function InputTextDefaultProps(props: BaseInputTextProps) {
    Object.assign(defaultInputTextProps, props)
}

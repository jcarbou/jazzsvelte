import { SpinnerIcon } from '@jazzsvelte/spinner_icon'
import { BaseButtonProps, ButtonPassThroughOptions } from './button.types'

/**
 * Global Pass Through options (for all buttons)
 */
export let globalButtonPT: ButtonPassThroughOptions | null

/**
 * Set global Pass Through options (for all buttons)
 * @param options
 */
export function buttonPT(options: ButtonPassThroughOptions) {
    globalButtonPT = options
}

/**
 * Default buttons  props
 */
export const defaultButtonProps: Omit<Required<BaseButtonProps>, 'pt' | 'ptOptions'> = {
    disabled: false,
    icon: null,
    text: false,
    raised: false,
    outlined: false,
    rounded: false,
    link: false,
    severity: null,
    iconPos: null,
    size: null,
    label: null,
    loading: false,
    loadingIcon: SpinnerIcon,
    plain: false,
    tooltip: null,
    tooltipOptions: undefined,
    visible: true,
    unstyled: false,
    class: null,
    style: null,
    badge: null
}

/**
 * Set global Pass Through options (for all buttons)
 * @param options
 */
export function buttonDefaultProps(props: BaseButtonProps) {
    Object.assign(defaultButtonProps, props)
}

import type { BaseSplitButtonProps, SplitButtonPassThroughOptions } from './splitButton.types'

/**
 * Global Pass Through options (for all splitButtons)
 */
export let globalSplitButtonPT: SplitButtonPassThroughOptions | null

/**
 * Set global Pass Through options (for all splitButtons)
 * @param options
 */
export function splitButtonPT(options: SplitButtonPassThroughOptions) {
    globalSplitButtonPT = options
}

/**
 * Default splitButton  props
 */
export const defaultSplitButtonProps: Omit<Required<BaseSplitButtonProps>, 'pt' | 'ptOptions'> = {
    buttonClass: null,
    buttonProps: null,
    disabled: false,
    dropdownIcon: null,
    icon: null,
    label: null,
    loading: false,
    loadingIcon: null,
    menuButtonClass: null,
    menuButtonProps: null,
    menuClass: null,
    menuStyle: null,
    menuIcon: null,
    model: [],
    outlined: false,
    raised: false,
    rounded: false,
    severity: null,
    size: null,
    text: false,
    tooltip: null,
    tooltipOptions: null,
    // transitionOptions: null,
    unstyled: false,
    visible: true,
    class: null,
    style: null
}

/**
 * Set global default props (for all splitButtons)
 * @param options
 */
export function splitButtonDefaultProps(props: Partial<Omit<BaseSplitButtonProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultSplitButtonProps, props)
}

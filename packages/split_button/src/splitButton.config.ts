import type { BaseSplitButtonProps, SplitButtonPassThroughOptions } from './splitButton.types'
import { ChevronDownIcon } from '@jazzsvelte/chevrondown_icon'
import { SpinnerIcon } from '@jazzsvelte/spinner_icon'

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
    appendTo: 'body',
    autoZIndex: true,
    baseZIndex: 0,
    buttonClass: null,
    buttonProps: null,
    disabled: false,
    dropdownIcon: ChevronDownIcon,
    icon: null,
    label: null,
    loading: false,
    loadingIcon: SpinnerIcon,
    menuButtonClass: null,
    menuButtonProps: null,
    menuClass: null,
    menuStyle: null,
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

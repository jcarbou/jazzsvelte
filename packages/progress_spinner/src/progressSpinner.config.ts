import type { BaseProgressSpinnerProps, ProgressSpinnerPassThroughOptions } from './progressSpinner.types'

/**
 * Global Pass Through options (for all progressSpinners)
 */
export let globalProgressSpinnerPT: ProgressSpinnerPassThroughOptions | null

/**
 * Set global Pass Through options (for all progressSpinners)
 * @param options
 */
export function progressSpinnerPT(options: ProgressSpinnerPassThroughOptions) {
    globalProgressSpinnerPT = options
}

/**
 * Default progressSpinner  props
 */
export const defaultProgressSpinnerProps: Omit<Required<BaseProgressSpinnerProps>, 'pt' | 'ptOptions'> = {
    animationDuration: '2s',
    class: null,
    fill: 'none',
    strokeWidth: '2',
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all progressSpinners)
 * @param options
 */
export function progressSpinnerDefaultProps(props: Partial<Omit<BaseProgressSpinnerProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultProgressSpinnerProps, props)
}

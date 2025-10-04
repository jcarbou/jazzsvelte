import type { BaseProgressBarProps, ProgressBarPassThroughOptions } from './progressBar.types'

/**
 * Global Pass Through options (for all progressBars)
 */
export let globalProgressBarPT: ProgressBarPassThroughOptions | null

/**
 * Set global Pass Through options (for all progressBars)
 * @param options
 */
export function progressBarPT(options: ProgressBarPassThroughOptions) {
    globalProgressBarPT = options
}

/**
 * Default progressBar  props
 */
export const defaultProgressBarProps: Omit<Required<BaseProgressBarProps>, 'pt' | 'ptOptions'> = {
    class: null,
    color: null,
    labelSnippet: null,
    mode: 'determinate',
    showValue: true,
    style: null,
    unit: '%',
    unstyled: false,
    value: null
}

/**
 * Set global default props (for all progressBars)
 * @param options
 */
export function progressBarDefaultProps(props: Partial<Omit<BaseProgressBarProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultProgressBarProps, props)
}

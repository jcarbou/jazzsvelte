import type { BaseStepsProps, StepsPassThroughOptions } from './steps.types'

/**
 * Global Pass Through options (for all stepss)
 */
export let globalStepsPT: StepsPassThroughOptions | null

/**
 * Set global Pass Through options (for all stepss)
 * @param options
 */
export function stepsPT(options: StepsPassThroughOptions) {
    globalStepsPT = options
}

/**
 * Default steps  props
 */
export const defaultStepsProps: Omit<Required<BaseStepsProps>, 'pt' | 'ptOptions' | 'onSelect'> = {
    activeIndex: 0,
    class: null,
    itemSnippet: null,
    model: [],
    readOnly: true,
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all stepss)
 * @param options
 */
export function stepsDefaultProps(props: Partial<Omit<BaseStepsProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultStepsProps, props)
}

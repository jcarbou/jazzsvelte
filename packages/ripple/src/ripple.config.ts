import { BaseRippleProps, RipplePassThroughOptions } from './ripple.types'

/**
 * Global Pass Through options (for all Ripples)
 */
export let globalRipplePT: RipplePassThroughOptions | null

/**
 * Set global Pass Through options (for all Ripples)
 * @param options
 */
export function ripplePT(options: RipplePassThroughOptions) {
    globalRipplePT = options
}

/**
 * Default Ripples  props
 */
export const defaultRippleProps: Omit<Required<BaseRippleProps>, 'pt' | 'ptOptions'> = {
    unstyled: false,
    class: null,
    style: null
}

/**
 * Set global Pass Through options (for all Ripples)
 * @param options
 */
export function RippleDefaultProps(props: BaseRippleProps) {
    Object.assign(defaultRippleProps, props)
}

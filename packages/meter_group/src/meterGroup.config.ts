import type { BaseMeterGroupProps, MeterGroupPassThroughOptions } from './meterGroup.types'

/**
 * Global Pass Through options (for all meterGroups)
 */
export let globalMeterGroupPT: MeterGroupPassThroughOptions | null

/**
 * Set global Pass Through options (for all meterGroups)
 * @param options
 */
export function meterGroupPT(options: MeterGroupPassThroughOptions) {
    globalMeterGroupPT = options
}

/**
 * Default meterGroup  props
 */
export const defaultMeterGroupProps: Omit<
    Required<BaseMeterGroupProps>,
    'pt' | 'ptOptions' | 'labelListSnippet' | 'startSnippet' | 'endSnippet' | 'meterSnippet'
> = {
    class: null,
    labelOrientation: 'horizontal',
    labelPosition: 'end',
    max: 100,
    min: 0,
    orientation: 'horizontal',
    style: null,
    unstyled: false,
    values: []
}

/**
 * Set global default props (for all meterGroups)
 * @param options
 */
export function meterGroupDefaultProps(props: Partial<Omit<BaseMeterGroupProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultMeterGroupProps, props)
}

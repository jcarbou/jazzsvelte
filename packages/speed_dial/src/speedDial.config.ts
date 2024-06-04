import type { BaseSpeedDialProps, SpeedDialPassThroughOptions } from './speedDial.types'
import { MinusIcon } from '@jazzsvelte/minus_icon'
import { PlusIcon } from '@jazzsvelte/plus_icon'

/**
 * Global Pass Through options (for all speedDials)
 */
export let globalSpeedDialPT: SpeedDialPassThroughOptions | null

/**
 * Set global Pass Through options (for all speedDials)
 * @param options
 */
export function speedDialPT(options: SpeedDialPassThroughOptions) {
    globalSpeedDialPT = options
}

/**
 * Default speedDial  props
 */
export const defaultSpeedDialProps: Omit<Required<BaseSpeedDialProps>, 'pt' | 'ptOptions'> = {
    buttonClass: null,
    buttonStyle: null,
    buttonTemplate: null,
    direction: 'up',
    disabled: false,
    hideIcon: MinusIcon,
    hideOnClickOutside: true,
    mask: false,
    maskClass: null,
    maskStyle: null,
    model: [],
    radius: 0,
    rotateAnimation: true,
    showIcon: PlusIcon,
    getTooltip: null,
    tooltipOptions: null,
    transitionDelay: 30,
    type: 'linear',
    unstyled: false,
    visible: false,
    style: null,
    class: null
}

/**
 * Set global default props (for all speedDials)
 * @param options
 */
export function speedDialDefaultProps(props: Partial<Omit<BaseSpeedDialProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultSpeedDialProps, props)
}

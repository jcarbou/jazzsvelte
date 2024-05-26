import type { BaseSpeedDialProps, SpeedDialPassThroughOptions } from './speedDial.types'


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
   buttonClassName: null,
   buttonStyle: null,
   buttonTemplate: null,
   direction: 'up',
   disabled: false,
   hideIcon: null,
   hideOnClickOutside: true,
   mask: false,
   maskClassName: null,
   maskStyle: null,
   model: null,
   radius: 0,
   rotateAnimation: true,
   showIcon: null,
   transitionDelay: 30,
   type: 'linear',
   unstyled: false,
   visible: false,
}

/**
 * Set global default props (for all speedDials)
 * @param options
 */
export function speedDialDefaultProps(props: Partial<Omit<BaseSpeedDialProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultSpeedDialProps, props)
}


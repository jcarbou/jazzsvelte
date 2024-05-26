import { BaseButtonGroupProps, ButtonGroupPassThroughOptions } from './buttonGroup.types'

/**
 * Global Pass Through options (for all ButtonGroups)
 */
export let globalButtonGroupPT: ButtonGroupPassThroughOptions | null

/**
 * Set global Pass Through options (for all ButtonGroups)
 * @param options
 */
export function buttonGroupPT(options: ButtonGroupPassThroughOptions) {
    globalButtonGroupPT = options
}

/**
 * Default ButtonGroups  props
 */
export const defaultButtonGroupProps: Omit<Required<BaseButtonGroupProps>, 'pt' | 'ptOptions'> = {
    disabled: false,
    rounded: false,
    outlined: false,
    raised: false,
    size: null,
    severity: null,
    iconPos: null,
    visible: true,
    unstyled: false,
    style: null,
    class: null
}

/**
 * Set global Pass Through options (for all ButtonGroups)
 * @param options
 */
export function ButtonGroupDefaultProps(props: BaseButtonGroupProps) {
    Object.assign(defaultButtonGroupProps, props)
}

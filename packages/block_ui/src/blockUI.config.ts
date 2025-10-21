import type { BaseBlockUIProps, BlockUIPassThroughOptions } from './blockUI.types'

/**
 * Global Pass Through options (for all blockUIs)
 */
export let globalBlockUIPT: BlockUIPassThroughOptions | null

/**
 * Set global Pass Through options (for all blockUIs)
 * @param options
 */
export function blockUIPT(options: BlockUIPassThroughOptions) {
    globalBlockUIPT = options
}

/**
 * Default blockUI  props
 */
export const defaultBlockUIProps: Omit<
    Required<BaseBlockUIProps>,
    'pt' | 'ptOptions' | 'snippet' | 'onBlocked' | 'onUnblocked'
> = {
    autoZIndex: true,
    baseZIndex: 0,
    blocked: false,
    class: null,
    containerClass: null,
    containerStyle: null,
    fullScreen: false,
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all blockUIs)
 * @param options
 */
export function blockUIDefaultProps(props: Partial<Omit<BaseBlockUIProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultBlockUIProps, props)
}

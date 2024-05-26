import { BaseToastProps, ToastPassThroughOptions } from './toast.types'

/**
 * Global Pass Through options (for all Toasts)
 */
export let globalToastPT: ToastPassThroughOptions | null

/**
 * Set global Pass Through options (for all Toasts)
 * @param options
 */
export function toastPT(options: ToastPassThroughOptions) {
    globalToastPT = options
}

/**
 * Default Toasts  props
 */
export const defaultToastProps: Omit<Required<BaseToastProps>, 'pt' | 'ptOptions'> = {
    id: 'default',
    position: 'bottom-right',
    content: null,
    unstyled: false,
    class: null,
    style: null
}

/**
 * Set global Pass Through options (for all Toasts)
 * @param options
 */
export function ToastDefaultProps(props: BaseToastProps) {
    Object.assign(defaultToastProps, props)
}

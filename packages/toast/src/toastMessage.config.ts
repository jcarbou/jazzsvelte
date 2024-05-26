import { TimesIcon } from '@jazzsvelte/times_icon'
import { BaseToastMessageProps, ToastMessagePassThroughOptions } from './toastMessage.types'
import { localeOption } from '@jazzsvelte/api'

/**
 * Global Pass Through options (for all ToastMessages)
 */
export let globalToastMessagePT: ToastMessagePassThroughOptions | null

/**
 * Set global Pass Through options (for all ToastMessages)
 * @param options
 */
export function toastMessagePT(options: ToastMessagePassThroughOptions) {
    globalToastMessagePT = options
}

/**
 * Default ToastMessages  props
 */
export const defaultToastMessageProps: Omit<Required<BaseToastMessageProps>, 'id' | 'pt' | 'ptOptions'> = {
    summary: null,
    detail: null,
    content: null,
    closable: true,
    icon: null,
    closeIcon: TimesIcon,
    sticky: false,
    onMouseEnter: null,
    onMouseLeave: null,
    onClose: null,
    onClick: null,
    contentClass: null,
    contentStyle: null,
    class: null,
    ariaCloseLabel: localeOption('close'),
    unstyled: false,
    style: null
}

/**
 * Set global Pass Through options (for all ToastMessages)
 * @param options
 */
export function ToastMessageDefaultProps(props: BaseToastMessageProps) {
    Object.assign(defaultToastMessageProps, props)
}

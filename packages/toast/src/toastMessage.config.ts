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
export const defaultToastMessageProps: Omit<Required<BaseToastMessageProps>, 'id' | 'timerId' | 'pt' | 'ptOptions'> = {
    summary: null,
    detail: null,
    customContent: null,
    customMessage: null,
    customProps: {},
    closable: true,
    icon: null,
    closeIcon: TimesIcon,
    sticky: false,
    life: 3000,
    //onMouseEnter: null,
    //onMouseLeave: null,
    onClose: null,
    onClick: null,
    contentClass: null,
    contentStyle: null,
    class: null,
    ariaCloseLabel: localeOption('close'),
    unstyled: false,
    severity: null,
    style: null,
    toastId: 'default'
}

/**
 * Set global Pass Through options (for all ToastMessages)
 * @param options
 */
export function ToastMessageDefaultProps(props: BaseToastMessageProps) {
    Object.assign(defaultToastMessageProps, props)
}

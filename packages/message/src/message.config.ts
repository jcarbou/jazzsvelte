import type { BaseMessageProps, MessagePassThroughOptions } from './message.types'

/**
 * Global Pass Through options (for all messages)
 */
export let globalMessagePT: MessagePassThroughOptions | null

/**
 * Set global Pass Through options (for all messages)
 * @param options
 */
export function messagePT(options: MessagePassThroughOptions) {
    globalMessagePT = options
}

/**
 * Default message  props
 */
export const defaultMessageProps: Omit<Required<BaseMessageProps>, 'pt' | 'ptOptions' | 'contentSnippet' | 'textSnippet'> = {
    class: null,
    content: null,
    icon: null,
    severity: 'info',
    style: null,
    text: null,
    unstyled: false
}

/**
 * Set global default props (for all messages)
 * @param options
 */
export function messageDefaultProps(props: Partial<Omit<BaseMessageProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultMessageProps, props)
}

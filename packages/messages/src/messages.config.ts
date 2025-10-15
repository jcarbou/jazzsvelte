import { fade } from 'svelte/transition'
import type { BaseMessagesProps, MessagesPassThroughOptions } from './messages.types'

/**
 * Global Pass Through options (for all messagess)
 */
export let globalMessagesPT: MessagesPassThroughOptions | null

/**
 * Set global Pass Through options (for all messagess)
 * @param options
 */
export function messagesPT(options: MessagesPassThroughOptions) {
    globalMessagesPT = options
}

/**
 * Default messages  props
 */
export const defaultMessagesProps: Omit<Required<BaseMessagesProps>, 'pt' | 'ptOptions' | 'onRemove' | 'onClick'> = {
    class: null,
    style: null,
    transition: (node) => fade(node, { duration: 200 }),
    unstyled: false
}

/**
 * Set global default props (for all messagess)
 * @param options
 */
export function messagesDefaultProps(props: Partial<Omit<BaseMessagesProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultMessagesProps, props)
}

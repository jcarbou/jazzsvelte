import { fade } from 'svelte/transition'
import { ChevronUpIcon } from '@jazzsvelte/chevronup_icon'
import type { BaseScrollTopProps, ScrollTopPassThroughOptions } from './scrollTop.types'

/**
 * Global Pass Through options (for all scrollTops)
 */
export let globalScrollTopPT: ScrollTopPassThroughOptions | null

/**
 * Set global Pass Through options (for all scrollTops)
 * @param options
 */
export function scrollTopPT(options: ScrollTopPassThroughOptions) {
    globalScrollTopPT = options
}

/**
 * Default scrollTop  props
 */
export const defaultScrollTopProps: Omit<Required<BaseScrollTopProps>, 'pt' | 'ptOptions' | 'onShow' | 'onHide'> = {
    behavior: 'smooth',
    class: null,
    icon: ChevronUpIcon,
    style: null,
    target: 'window',
    threshold: 400,
    transition: (node) => fade(node, { duration: 200 }),
    unstyled: false
}

/**
 * Set global default props (for all scrollTops)
 * @param options
 */
export function scrollTopDefaultProps(props: Partial<Omit<BaseScrollTopProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultScrollTopProps, props)
}

import type { BaseCardProps, CardPassThroughOptions } from './card.types'

/**
 * Global Pass Through options (for all cards)
 */
export let globalCardPT: CardPassThroughOptions | null

/**
 * Set global Pass Through options (for all cards)
 * @param options
 */
export function cardPT(options: CardPassThroughOptions) {
    globalCardPT = options
}

/**
 * Default card  props
 */
export const defaultCardProps: Omit<
    Required<BaseCardProps>,
    'pt' | 'ptOptions' | 'footerSnippet' | 'headerSnippet' | 'titleSnippet' | 'subTitleSnippet'
> = {
    class: null,
    style: null,
    subTitle: null,
    title: null,
    unstyled: false
}

/**
 * Set global default props (for all cards)
 * @param options
 */
export function cardDefaultProps(props: Partial<Omit<BaseCardProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultCardProps, props)
}

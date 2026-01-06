import type { BaseTabMenuProps, TabMenuPassThroughOptions } from './tabMenu.types'

/**
 * Global Pass Through options (for all tabMenus)
 */
export let globalTabMenuPT: TabMenuPassThroughOptions | null

/**
 * Set global Pass Through options (for all tabMenus)
 * @param options
 */
export function tabMenuPT(options: TabMenuPassThroughOptions) {
    globalTabMenuPT = options
}

/**
 * Default tabMenu  props
 */
export const defaultTabMenuProps: Omit<Required<BaseTabMenuProps>, 'pt' | 'ptOptions' | 'onTabChange'> = {
    activeIndex: 0,
    class: null,
    itemSnippet: null,
    model: null,
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all tabMenus)
 * @param options
 */
export function tabMenuDefaultProps(props: Partial<Omit<BaseTabMenuProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultTabMenuProps, props)
}

import type { BaseTieredMenuProps, TieredMenuPassThroughOptions } from './tieredMenu.types'
import { AngleRightIcon } from '@jazzsvelte/angleright_icon'

/**
 * Global Pass Through options (for all tieredMenus)
 */
export let globalTieredMenuPT: TieredMenuPassThroughOptions | null

/**
 * Set global Pass Through options (for all tieredMenus)
 * @param options
 */
export function tieredMenuPT(options: TieredMenuPassThroughOptions) {
    globalTieredMenuPT = options
}

/**
 * Default tieredMenu  props
 */
export const defaultTieredMenuProps: Omit<Required<BaseTieredMenuProps>, 'pt' | 'ptOptions'> = {
    appendTo: 'body',
    autoZIndex: true,
    baseZIndex: 0,
    breakpoint: null,
    model: [],
    popup: false,
    scrollHeight: '400px',
    submenuIcon: AngleRightIcon,
    //transitionOptions: null,
    unstyled: false,
    class: null,
    style: null
}

/**
 * Set global default props (for all tieredMenus)
 * @param options
 */
export function tieredMenuDefaultProps(props: Partial<Omit<BaseTieredMenuProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultTieredMenuProps, props)
}

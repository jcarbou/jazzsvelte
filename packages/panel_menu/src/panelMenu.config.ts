import type { BasePanelMenuProps, PanelMenuPassThroughOptions } from './panelMenu.types'
import { ChevronDownIcon } from '@jazzsvelte/chevrondown_icon'
import { ChevronRightIcon } from '@jazzsvelte/chevronright_icon'

/**
 * Global Pass Through options (for all panelMenus)
 */
export let globalPanelMenuPT: PanelMenuPassThroughOptions | null

/**
 * Set global Pass Through options (for all panelMenus)
 * @param options
 */
export function panelMenuPT(options: PanelMenuPassThroughOptions) {
    globalPanelMenuPT = options
}

/**
 * Default panelMenu  props
 */
export const defaultPanelMenuProps: Omit<
    Required<BasePanelMenuProps>,
    'pt' | 'ptOptions' | 'expandedKeys' | 'onHide' | 'onShow' | 'onOpen' | 'onClose'
> = {
    class: null,
    itemSnippet: null,
    model: [],
    multiple: false,
    style: null,
    activeSubmenuIcon: ChevronDownIcon,
    submenuIcon: ChevronRightIcon,
    unstyled: false
}

/**
 * Set global default props (for all panelMenus)
 * @param options
 */
export function panelMenuDefaultProps(props: Partial<Omit<BasePanelMenuProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultPanelMenuProps, props)
}

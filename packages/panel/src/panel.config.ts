import type { BasePanelProps, PanelPassThroughOptions } from './panel.types'
import { MinusIcon } from '@jazzsvelte/minus_icon'
import { PlusIcon } from '@jazzsvelte/plus_icon'

/**
 * Global Pass Through options (for all panels)
 */
export let globalPanelPT: PanelPassThroughOptions | null

/**
 * Set global Pass Through options (for all panels)
 * @param options
 */
export function panelPT(options: PanelPassThroughOptions) {
    globalPanelPT = options
}

/**
 * Default panel  props
 */
export const defaultPanelProps: Omit<Required<BasePanelProps>, 'pt' | 'ptOptions'> = {
    class: null,
    collapsed: false,
    collapseIcon: MinusIcon,
    expandIcon: PlusIcon,
    header: null,
    footer: null,
    icons: null,
    onCollapse: null,
    onExpand: null,
    onToggle: null,
    style: null,
    toggleable: false,
    unstyled: false
}

/**
 * Set global default props (for all panels)
 * @param options
 */
export function panelDefaultProps(props: Partial<Omit<BasePanelProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultPanelProps, props)
}

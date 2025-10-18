import type { BaseInplaceProps, InplacePassThroughOptions } from './inplace.types'
import { TimesIcon } from '@jazzsvelte/times_icon'
/**
 * Global Pass Through options (for all inplaces)
 */
export let globalInplacePT: InplacePassThroughOptions | null

/**
 * Set global Pass Through options (for all inplaces)
 * @param options
 */
export function inplacePT(options: InplacePassThroughOptions) {
    globalInplacePT = options
}

/**
 * Default inplace  props
 */
export const defaultInplaceProps: Omit<
    Required<BaseInplaceProps>,
    'pt' | 'ptOptions' | 'onClose' | 'onOpen' | 'onToggle' | 'contentSnippet' | 'displaySnippet'
> = {
    active: false,
    ariaLabel: null,
    class: null,
    closable: false,
    closeIcon: TimesIcon,
    disabled: false,
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all inplaces)
 * @param options
 */
export function inplaceDefaultProps(props: Partial<Omit<BaseInplaceProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultInplaceProps, props)
}

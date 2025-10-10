import type { BaseChipProps, ChipPassThroughOptions } from './chip.types'
import { TimesCircleIcon } from '@jazzsvelte/timescircle_icon'

/**
 * Global Pass Through options (for all chips)
 */
export let globalChipPT: ChipPassThroughOptions | null

/**
 * Set global Pass Through options (for all chips)
 * @param options
 */
export function chipPT(options: ChipPassThroughOptions) {
    globalChipPT = options
}

/**
 * Default chip  props
 */
export const defaultChipProps: Omit<
    Required<BaseChipProps>,
    'pt' | 'ptOptions' | 'onImageError' | 'onRemove' | 'contentSnippet'
> = {
    class: null,
    icon: null,
    image: null,
    imageAlt: 'chip',
    label: null,
    removable: false,
    removeIcon: TimesCircleIcon,
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all chips)
 * @param options
 */
export function chipDefaultProps(props: Partial<Omit<BaseChipProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultChipProps, props)
}

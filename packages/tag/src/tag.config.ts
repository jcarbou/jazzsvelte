import type { BaseTagProps, TagPassThroughOptions } from './tag.types'

/**
 * Global Pass Through options (for all tags)
 */
export let globalTagPT: TagPassThroughOptions | null

/**
 * Set global Pass Through options (for all tags)
 * @param options
 */
export function tagPT(options: TagPassThroughOptions) {
    globalTagPT = options
}

/**
 * Default tag  props
 */
export const defaultTagProps: Omit<Required<BaseTagProps>, 'pt' | 'ptOptions'> = {
    class: null,
    icon: null,
    rounded: false,
    severity: null,
    style: null,
    unstyled: false,
    valueSnippet: null,
    value: null
}

/**
 * Set global default props (for all tags)
 * @param options
 */
export function tagDefaultProps(props: Partial<Omit<BaseTagProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultTagProps, props)
}

import type { BaseSkeletonProps, SkeletonPassThroughOptions } from './skeleton.types'

/**
 * Global Pass Through options (for all skeletons)
 */
export let globalSkeletonPT: SkeletonPassThroughOptions | null

/**
 * Set global Pass Through options (for all skeletons)
 * @param options
 */
export function skeletonPT(options: SkeletonPassThroughOptions) {
    globalSkeletonPT = options
}

/**
 * Default skeleton  props
 */
export const defaultSkeletonProps: Omit<Required<BaseSkeletonProps>, 'pt' | 'ptOptions'> = {
    animation: 'wave',
    borderRadius: null,
    class: null,
    height: '1rem',
    shape: 'rectangle',
    size: null,
    style: null,
    unstyled: false,
    width: '100%'
}

/**
 * Set global default props (for all skeletons)
 * @param options
 */
export function skeletonDefaultProps(props: Partial<Omit<BaseSkeletonProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultSkeletonProps, props)
}

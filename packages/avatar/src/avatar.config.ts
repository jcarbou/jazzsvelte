import type { BaseAvatarProps, AvatarPassThroughOptions } from './avatar.types'

/**
 * Global Pass Through options (for all avatars)
 */
export let globalAvatarPT: AvatarPassThroughOptions | null

/**
 * Set global Pass Through options (for all avatars)
 * @param options
 */
export function avatarPT(options: AvatarPassThroughOptions) {
    globalAvatarPT = options
}

/**
 * Default avatar  props
 */
export const defaultAvatarProps: Omit<Required<BaseAvatarProps>, 'pt' | 'ptOptions' | 'onClick' | 'onImageError'> = {
    class: null,
    icon: null,
    image: null,
    imageAlt: 'avatar',
    imageFallback: 'default',
    label: null,
    shape: 'square',
    size: 'normal',
    style: null,
    unstyled: false
}

/**
 * Set global default props (for all avatars)
 * @param options
 */
export function avatarDefaultProps(props: Partial<Omit<BaseAvatarProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultAvatarProps, props)
}

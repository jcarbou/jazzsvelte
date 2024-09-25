import type { BaseAvatarGroupProps, AvatarGroupPassThroughOptions } from './avatarGroup.types'


/**
 * Global Pass Through options (for all avatarGroups)
 */
export let globalAvatarGroupPT: AvatarGroupPassThroughOptions | null

/**
 * Set global Pass Through options (for all avatarGroups)
 * @param options
 */
export function avatarGroupPT(options: AvatarGroupPassThroughOptions) {
    globalAvatarGroupPT = options
}

/**
 * Default avatarGroup  props
 */
export const defaultAvatarGroupProps: Omit<Required<BaseAvatarGroupProps>, 'pt' | 'ptOptions'> = {
   class: null,
   style: null,
   unstyled: false,
}

/**
 * Set global default props (for all avatarGroups)
 * @param options
 */
export function avatarGroupDefaultProps(props: Partial<Omit<BaseAvatarGroupProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultAvatarGroupProps, props)
}


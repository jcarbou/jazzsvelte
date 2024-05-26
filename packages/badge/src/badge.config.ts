import { BaseBadgeProps, BadgePassThroughOptions } from './badge.types'

/**
 * Global Pass Through options (for all Badges)
 */
export let globalBadgePT: BadgePassThroughOptions | null

/**
 * Set global Pass Through options (for all Badges)
 * @param options
 */
export function badgePT(options: BadgePassThroughOptions) {
    globalBadgePT = options
}

/**
 * Default Badges  props
 */
export const defaultBadgeProps: Omit<Required<BaseBadgeProps>, 'pt' | 'ptOptions'> = {
    value: null,
    severity: null,
    size: null,
    unstyled: false,
    style: null,
    class: null
}

/**
 * Set global Pass Through options (for all Badges)
 * @param options
 */
export function BadgeDefaultProps(props: BaseBadgeProps) {
    Object.assign(defaultBadgeProps, props)
}

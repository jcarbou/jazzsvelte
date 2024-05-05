import type { ButtonGroupContext, IconPos } from './button.types'

export const SIZE_VALUE_TO_CSS = {
    small: 'sm',
    normal: '',
    large: 'lg'
}

export function getIconPos(iconPos: IconPos | null, context: ButtonGroupContext): IconPos {
    return iconPos ?? context?.iconPos ?? 'left'
}

export function isIconPos(iconPos: IconPos | null, context: ButtonGroupContext, values: IconPos[]): boolean {
    return values.includes(getIconPos(iconPos, context))
}

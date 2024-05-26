import type { ButtonIconPos } from './button.types'
import { ButtonGroupContext } from './buttonGroup.types'

export const SIZE_VALUE_TO_CSS = {
    small: 'sm',
    normal: '',
    large: 'lg'
}

export function getIconPos(iconPos: ButtonIconPos | null, context: ButtonGroupContext): ButtonIconPos {
    return iconPos ?? context?.iconPos ?? 'left'
}

export function isIconPos(iconPos: ButtonIconPos | null, context: ButtonGroupContext, values: ButtonIconPos[]): boolean {
    return values.includes(getIconPos(iconPos, context))
}

import { ButtonIconPos, ButtonSeverity, ButtonSize } from './button.types'

export type ButtonGroupContext = {
    disabled: boolean
    rounded: boolean
    outlined: boolean
    size?: ButtonSize
    severity?: ButtonSeverity
    iconPos?: ButtonIconPos
}

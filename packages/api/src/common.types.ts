import { IconComponent } from './pt.types'

export type MenuItem = {
    label?: string
    icon?: string | IconComponent
    command?: () => void
}

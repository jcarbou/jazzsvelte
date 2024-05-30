import { CssObject, IconComponent } from './pt.types'

export type MenuItem = {
    disabled: boolean
    label?: string
    icon?: string | IconComponent
    command?: (event: { originalEvent: MouseEvent | KeyboardEvent; item: MenuItem }) => void
    template?: string
    url?: string
    target?: string
    class?: string
    style?: CssObject | string
    visible?: boolean
}

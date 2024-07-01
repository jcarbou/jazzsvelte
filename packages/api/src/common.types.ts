import { CssObject, IconComponent } from './pt.types'

export type MenuItem = {
    command?: (event: { originalEvent: MouseEvent | KeyboardEvent; item: MenuItem }) => void
    description?: string
    disabled?: boolean
    class?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
    expanded?: boolean
    icon?: string | IconComponent
    id?: string
    items?: MenuItem[] // commented for TieredMenu | MenuItem[][]
    label?: string
    separator?: boolean
    style?: CssObject | string
    target?: string
    template?: string
    url?: string
    visible?: boolean
}

export type AppendTo = null | HTMLElement | 'self' | 'body' | (() => HTMLElement | 'self')

export type OnEvent = null | ((event: Event) => void)

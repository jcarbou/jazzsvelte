import { Snippet } from 'svelte'
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
    snippet?: Snippet<[MenuItemSnippetProps]> | null
    url?: string
    visible?: boolean
    badge?: string | number
    shortcut?: string
}

export type MenuItemDefaultSnippetProps = {
    item: MenuItem
    index: number
}

export type MenuItemSnippetProps = {
    item: MenuItem
    index: number
    defaultSnippet?: Snippet<[MenuItemDefaultSnippetProps]>
}

export type AppendTo = null | HTMLElement | 'self' | 'body' | (() => HTMLElement | 'self' | 'body')

export type OnEvent = null | ((event: Event) => void)

export type OnImageError = null | ((event: UIEvent) => void)

export type TimeoutId = ReturnType<typeof setTimeout> | null

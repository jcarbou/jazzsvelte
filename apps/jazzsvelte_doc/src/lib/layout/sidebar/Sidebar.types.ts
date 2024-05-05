export type SidebarData = MenuData[]

export type MenuData = {
    name: string
    icon?: string
    children?: (MenuItemData | SubMenuData)[]
    href?: string
    to?: string
}

export type MenuItemData = {
    name: string
    href?: string
    to?: string
}

export type SubMenuData = {
    name: string
    children: MenuItemData[]
}

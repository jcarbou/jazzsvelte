export type SidebarData = MenuData[]

export type MenuData = {
    __TYPE: 'menu'
    name: string
    icon?: string
    children?: (MenuItemData | SubMenuData)[]
    href?: string
    to?: string
}

export type MenuItemData = {
    __TYPE: 'menuItem'
    name: string
    href?: string
    to?: string
    done?: boolean
}

export type SubMenuData = {
    __TYPE: 'subMenu'
    name: string
    children: MenuItemData[]
}

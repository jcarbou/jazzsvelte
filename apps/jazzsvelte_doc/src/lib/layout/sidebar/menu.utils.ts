import jsonData from './menuData.json'
import type { MenuData, MenuItemData, SubMenuData } from './Sidebar.types'

type MenuJsonData = {
    name: string
    icon?: string
    children?: (MenuItemJsonData | SubMenuJsonData)[]
    href?: string
    to?: string
}

export type MenuItemJsonData = {
    name: string
    href?: string
    to?: string
}

export type SubMenuJsonData = {
    name: string
    children: MenuItemJsonData[]
}

const data: MenuJsonData[] = jsonData.data

function toMenuItemData(menuItemJsonData: MenuItemJsonData): MenuItemData {
    return {
        __TYPE: 'menuItem',
        ...menuItemJsonData
    }
}
export const MENU_DATA: MenuData[] = data.map((menuJsonData) => {
    const menuData: MenuData = {
        __TYPE: 'menu',
        ...menuJsonData,
        children: undefined
    }
    if (menuJsonData.children) {
        menuData.children = menuJsonData.children.map((subMenuOrMenuItemData) => {
            const subMenuJsonData = subMenuOrMenuItemData as SubMenuJsonData
            const menuItemJsonData = subMenuOrMenuItemData as MenuItemJsonData
            if (subMenuJsonData.children) {
                const subMenuData: SubMenuData = {
                    __TYPE: 'subMenu',
                    ...subMenuJsonData,
                    children: subMenuJsonData.children.map(toMenuItemData)
                }
                return subMenuData
            }
            return toMenuItemData(menuItemJsonData)
        })
    }
    return menuData
})

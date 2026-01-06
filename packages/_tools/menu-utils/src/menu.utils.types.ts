import type { MenuItem } from '@jazzsvelte/api'

/**
 * Menu item "onChange" listener
 * If return true the menu item is acrivated
 */
export type OnMenuItemSelect = ({
    originalEvent,
    item,
    index
}: {
    originalEvent: MouseEvent | KeyboardEvent
    item: MenuItem
    index: number
}) => void | boolean

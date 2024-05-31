import { MenuItem } from '@jazzsvelte/api'

export function findPrevOptionIndex(index: number, items: MenuItem[]): number | null {
    const filteredItems = items.filter((item) => !item.disabled)
    const filteredIndex = index === -1 ? filteredItems.length - 1 : filteredItems.indexOf(items[index]) - 1
    const item = filteredItems[filteredIndex]
    return item ? items.indexOf(item) : null
}

export function findNextOptionIndex(index: number, items: MenuItem[]): number | null {
    const filteredItems = items.filter((item) => !item.disabled)
    const filteredIndex = index === -1 ? 0 : filteredItems.indexOf(items[index]) + 1
    const item = filteredItems[filteredIndex]
    return item ? items.indexOf(item) : null
}

import type { PanelMenuItem, ProcessedItem } from './panelMenu.types'

export function generatePanelId(mainId: string, index: number) {
    return `${mainId}_${index}`
}

export function generateHeaderId(mainId: string, itemId: string | null | undefined, index: number) {
    return `${itemId || generatePanelId(mainId, index)}_header`
}

export function generateContentId(mainId: string, itemId: string | null | undefined, index: number) {
    return `${itemId || generatePanelId(mainId, index)}_content`
}

export function hasItem(items: ProcessedItem[], item: ProcessedItem) {
    return items.some((a) => a.key === item.key)
}

export function createProcessedItems(
    items: PanelMenuItem[],
    level: ProcessedItem['level'] = 0,
    parent: ProcessedItem['parent'] = null,
    parentKey: ProcessedItem['parentKey'] = null
): ProcessedItem[] {
    return (
        items?.map((item, index) => {
            const key = (parentKey ? parentKey + '_' : '') + index
            const newItem: ProcessedItem = {
                item,
                index,
                level,
                key: item.key || key,
                parent,
                parentKey,
                items: null,
                isSeparator: !!item.separator,
                isDisabled: !!item.disabled,
                isVisible: item.visible !== false,
                isValid: !item.separator && !item.disabled,
                isRoot: !parent,
                isGrouped: !!item.items?.length
            }

            if (item.items?.length) {
                newItem.items = createProcessedItems(item.items, level + 1, newItem, key)
            }
            return newItem
        }) || []
    )
}

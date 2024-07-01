import type { MenuItem } from '@jazzsvelte/api'
import type { FocusedItemInfo, ModelContext, ProcessedItem } from './tieredMenu.types'

export function createProcessedItems(
    items: MenuItem[],
    level: ProcessedItem['level'] = 0,
    parent: ProcessedItem['parent'] = null,
    parentKey: ProcessedItem['parentKey'] = null
): ProcessedItem[] | null {
    return (
        items?.map((item, index) => {
            const key = (parentKey ? parentKey + '_' : '') + index
            const newItem: ProcessedItem = {
                item,
                index,
                level,
                key,
                parent,
                parentKey,
                items: null,
                isSeparator: !!item.separator,
                isDisabled: !!item.disabled,
                isVisible: item?.visible !== false,
                isValid: !item.separator && !item.disabled,
                isRoot: !parent,
                isGrouped: !!items?.length
            }

            if (item.items?.length) {
                newItem.items = createProcessedItems(item.items, level + 1, newItem, key)
            }
            return newItem
        }) || null
    )
}

export function addActiveItem(
    context: ModelContext,
    processedItem: ProcessedItem | null
): {
    newActiveItemPath: ProcessedItem[]
    newFocusedItemInfo: FocusedItemInfo
} | null {
    if (!processedItem) {
        return null
    }
    const { activeItemPath } = context

    const { index, key, level, parentKey, items } = processedItem
    const grouped = !!items

    const newActiveItemPath = activeItemPath.filter((p) => p.parentKey !== parentKey && p.parentKey !== key)
    const newFocusedItemInfo = { index, level, parentKey }
    if (grouped) {
        newActiveItemPath.push(processedItem)
    }
    return {
        newActiveItemPath,
        newFocusedItemInfo
    }
}

function _isValidItem(processedItem: ProcessedItem | null): boolean {
    return !!processedItem && !processedItem.isValid
}

export function getItemLabel(processedItem: ProcessedItem | null): string | null {
    return processedItem?.item?.label || null
}

export function isItemMatched(processedItem: ProcessedItem | null, searchValue: string | null): boolean {
    if (!_isValidItem(processedItem)) return false
    const label = getItemLabel(processedItem)?.toLocaleLowerCase(),
        searchLabel = searchValue?.toLocaleLowerCase()

    return !!label && !!searchLabel && label.startsWith(searchLabel)
}

export function isSelectedItem(context: ModelContext, processedItem: ProcessedItem | null): boolean {
    const { activeItemPath } = context
    return activeItemPath.some((p) => p.key === (processedItem?.key || null))
}

export function getRootItem(context: ModelContext, processedItem: ProcessedItem | null) {
    const { activeItemPath } = context
    return processedItem?.isRoot ? processedItem : activeItemPath.find((p) => p.parentKey === null)
}

export function isValidSelectedItem(context: ModelContext, processedItem: ProcessedItem | null): boolean {
    return _isValidItem(processedItem) && isSelectedItem(context, processedItem)
}

export function getFocusedItem(context: ModelContext): ProcessedItem {
    const { visibleItems, focusedItemInfo } = context
    return visibleItems[focusedItemInfo.index]
}

export function getFocusedItemParent(context: ModelContext): ProcessedItem | null {
    const { activeItemPath } = context
    const processedItem = getFocusedItem(context)
    return activeItemPath.find((p) => p.key === processedItem.parentKey) || null
}

export function findPrevItemIndex(context: ModelContext, index: number): number {
    const { visibleItems } = context
    const matchedItemIndex = index > 0 ? visibleItems.slice(0, index).findLastIndex(_isValidItem) : -1

    return matchedItemIndex > -1 ? matchedItemIndex : index
}

export function findNextItemIndex(context: ModelContext, index: number): number {
    const { visibleItems } = context
    const matchedItemIndex =
        index < visibleItems.length - 1
            ? visibleItems.slice(index + 1).findIndex((processedItem) => _isValidItem(processedItem))
            : -1

    return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index
}

export function findFirstFocusedItemIndex(context: ModelContext): number {
    const selectedIndex = findSelectedItemIndex(context)

    return selectedIndex < 0 ? findFirstItemIndex(context) : selectedIndex
}

export function findLastItemIndex(context: ModelContext): number {
    const { visibleItems } = context
    return visibleItems.findLastIndex(_isValidItem)
}

export function findFirstItemIndex(context: ModelContext): number {
    const { visibleItems } = context
    return visibleItems.findIndex((processedItem) => _isValidItem(processedItem))
}

export function findSelectedItemIndex(context: ModelContext): number {
    const { visibleItems } = context
    return visibleItems.findIndex((processedItem) => isValidSelectedItem(context, processedItem))
}

export function findLastFocusedItemIndex(context: ModelContext): number {
    const selectedIndex = findSelectedItemIndex(context)

    return selectedIndex < 0 ? findLastItemIndex(context) : selectedIndex
}

export function searchItemIndex(context: ModelContext, searchValue: string): number {
    const { focusedItemInfo, visibleItems } = context
    let itemIndex = -1

    if (focusedItemInfo.index !== -1) {
        itemIndex = visibleItems
            .slice(focusedItemInfo.index)
            .findIndex((processedItem) => isItemMatched(processedItem, searchValue))
        itemIndex =
            itemIndex === -1
                ? visibleItems
                      .slice(0, focusedItemInfo.index)
                      .findIndex((processedItem) => isItemMatched(processedItem, searchValue))
                : itemIndex + focusedItemInfo.index
    } else {
        itemIndex = visibleItems.findIndex((processedItem) => isItemMatched(processedItem, searchValue))
    }

    if (itemIndex === -1 && focusedItemInfo.index === -1) {
        itemIndex = findFirstFocusedItemIndex(context)
    }

    return itemIndex
}

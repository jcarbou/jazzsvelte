import type { MenuItem } from '@jazzsvelte/api'
import type { ActiveItemPathStore, FocusedItemInfo, FocusedItemInfoStore, ProcessedItem } from './tieredMenu.types'
import { writable } from 'svelte/store'

export function createActiveItemPathStore(): ActiveItemPathStore {
    const { subscribe, set, update } = writable<ProcessedItem[]>([])

    return {
        subscribe,
        clear: () => {
            set([])
        },
        add: (processedItem: ProcessedItem) => {
            update((state: ProcessedItem[]) => {
                const { key, parentKey, isGrouped } = processedItem
                const newState = state.filter((p) => p.parentKey !== parentKey && p.parentKey !== key)
                if (isGrouped) {
                    newState.push(processedItem)
                }
                return newState
            })
        },
        filter: (fn: (p: ProcessedItem) => boolean) => {
            update((state: ProcessedItem[]) => {
                return state.filter(fn)
            })
        }
    }
}
export function createFocusedItemInfoStore(): FocusedItemInfoStore {
    const { subscribe, set, update: update } = writable<FocusedItemInfo>({ index: -1, level: 0, parentKey: '' })

    return {
        subscribe,
        set,
        clear: () => {
            set({ index: -1, level: 0, parentKey: '' })
        },
        setByProcessedItem: (processedItem: ProcessedItem) => {
            const { index, level, parentKey } = processedItem
            set({ index, level, parentKey })
        },
        partialUpdate: (data: Partial<FocusedItemInfo>) => {
            update((state) => ({
                ...state,
                data
            }))
        },
        updateIfNotSet: (data: FocusedItemInfo) => {
            update((state) => (state.index !== -1 ? state : data))
        }
    }
}

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

export function isSelectedItem(activeItemPath: ProcessedItem[], processedItem: ProcessedItem | null): boolean {
    return activeItemPath.some((p) => p.key === (processedItem?.key || null))
}

export function getFocusedItem(focusedItemInfo: FocusedItemInfo, visibleItems: ProcessedItem[]): ProcessedItem {
    return visibleItems[focusedItemInfo.index]
}

export function getFocusedItemParent(
    activeItemPath: ProcessedItem[],
    focusedItemInfo: FocusedItemInfo,
    visibleItems: ProcessedItem[]
): ProcessedItem | null {
    const processedItem = getFocusedItem(focusedItemInfo, visibleItems)
    return activeItemPath.find((p) => p.key === processedItem.parentKey) || null
}

export function findPrevItemIndex(visibleItems: ProcessedItem[], index: number): number {
    const matchedItemIndex = index > 0 ? visibleItems.slice(0, index).findLastIndex(_isValidItem) : -1

    return matchedItemIndex > -1 ? matchedItemIndex : index
}

export function findNextItemIndex(visibleItems: ProcessedItem[], index: number): number {
    const matchedItemIndex =
        index < visibleItems.length - 1
            ? visibleItems.slice(index + 1).findIndex((processedItem) => _isValidItem(processedItem))
            : -1

    return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index
}

export function findFirstFocusedItemIndex(activeItemPath: ProcessedItem[], visibleItems: ProcessedItem[]): number {
    const selectedIndex = findSelectedItemIndex(activeItemPath, visibleItems)

    return selectedIndex < 0 ? findFirstItemIndex(visibleItems) : selectedIndex
}

export function findLastItemIndex(visibleItems: ProcessedItem[]): number {
    return visibleItems.findLastIndex(_isValidItem)
}

export function findFirstItemIndex(visibleItems: ProcessedItem[]): number {
    return visibleItems.findIndex((processedItem) => _isValidItem(processedItem))
}

export function findSelectedItemIndex(activeItemPath: ProcessedItem[], visibleItems: ProcessedItem[]): number {
    return visibleItems.findIndex((processedItem) => _isValidItem(processedItem) && isSelectedItem(activeItemPath, processedItem))
}

export function findLastFocusedItemIndex(activeItemPath: ProcessedItem[], visibleItems: ProcessedItem[]): number {
    const selectedIndex = findSelectedItemIndex(activeItemPath, visibleItems)

    return selectedIndex < 0 ? findLastItemIndex(visibleItems) : selectedIndex
}

export function searchItemIndex(
    activeItemPath: ProcessedItem[],
    focusedItemInfo: FocusedItemInfo,
    visibleItems: ProcessedItem[],
    searchValue: string
): number {
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
        itemIndex = findFirstFocusedItemIndex(activeItemPath, visibleItems)
    }

    return itemIndex
}

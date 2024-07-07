import type { MenuItem } from '@jazzsvelte/api'
import type { ActiveItemPathStore, FocusedItemInfo, FocusedItemInfoStore, ProcessedItem } from './tieredMenu.types'
import { writable } from 'svelte/store'

function toSateId(processedItems: ProcessedItem[]): string {
    return processedItems.map((item) => item.key).join(' | ')
}

export function createActiveItemPathStore(): ActiveItemPathStore {
    const { subscribe, update } = writable<ProcessedItem[]>([])

    return {
        subscribe,
        clear: () => {
            update((state: ProcessedItem[]) => {
                const newState: ProcessedItem[] = []
                if (toSateId(state) === toSateId(newState)) return state
                //console.log(`Add Active = ${newState.map((it) => it.item.label).join(' => ')}`)
                return newState
            })
        },
        add: (processedItem: ProcessedItem) => {
            update((state: ProcessedItem[]) => {
                const { key, parentKey, isGrouped } = processedItem
                const newState = state.filter((p) => p.parentKey !== parentKey && p.parentKey !== key)
                if (isGrouped) {
                    newState.push(processedItem)
                }
                if (toSateId(state) === toSateId(newState)) return state
                //console.log(`Add Active = ${newState.map((it) => it.item.label).join(' => ')}`)
                return newState
            })
        },
        filter: (fn: (p: ProcessedItem) => boolean) => {
            update((state: ProcessedItem[]) => {
                const newState = state.filter(fn)
                if (toSateId(state) === toSateId(newState)) return state
                //console.log(`Filter Active = ${newState.map((it) => it.item.label).join(' => ')}`)
                return newState
            })
        }
    }
}

function isSameFocusedItemInfo(a: FocusedItemInfo, b: FocusedItemInfo): boolean {
    return a.index === b.index && a.level === b.level && a.parentKey === b.parentKey
}
const DEFAULT_FOCUSED_ITEM_INFO = { index: -1, level: 0, parentKey: null }
export function createFocusedItemInfoStore(): FocusedItemInfoStore {
    const { subscribe, update: update } = writable<FocusedItemInfo>(DEFAULT_FOCUSED_ITEM_INFO)

    return {
        subscribe,
        set: (newState: FocusedItemInfo) => {
            update((state) => {
                return isSameFocusedItemInfo(state, newState) ? state : newState
            })
        },
        clear: () => {
            update((state) => {
                const newState = DEFAULT_FOCUSED_ITEM_INFO
                return isSameFocusedItemInfo(state, newState) ? state : newState
            })
        },
        setByProcessedItem: (processedItem: ProcessedItem) => {
            update((state) => {
                const { index, level, parentKey } = processedItem
                const newState = { index, level, parentKey }
                return isSameFocusedItemInfo(state, newState) ? state : newState
            })
        },
        partialUpdate: (data: Partial<FocusedItemInfo>) => {
            update((state) => {
                const newState = {
                    ...state,
                    ...data
                }
                return isSameFocusedItemInfo(state, newState) ? state : newState
            })
        },
        updateIfNotSet: (newState: FocusedItemInfo) => {
            update((state) => {
                if (state.index !== -1) return state
                return isSameFocusedItemInfo(state, newState) ? state : newState
            })
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
                isVisible: item.visible !== false,
                isValid: !item.separator && !item.disabled,
                isRoot: !parent,
                isGrouped: !!item.items?.length
            }

            if (item.items?.length) {
                newItem.items = createProcessedItems(item.items, level + 1, newItem, key)
            }
            return newItem
        }) || null
    )
}

function _isValidItem(processedItem: ProcessedItem | null): boolean {
    return !!processedItem && processedItem.isValid
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

export function getFocusedItem(focusedItemInfo: FocusedItemInfo, visibleItems: ProcessedItem[]): ProcessedItem | null {
    return visibleItems[focusedItemInfo.index]
}

export function getFocusedItemParent(
    activeItemPath: ProcessedItem[],
    focusedItemInfo: FocusedItemInfo,
    visibleItems: ProcessedItem[]
): ProcessedItem | null {
    const processedItem = getFocusedItem(focusedItemInfo, visibleItems)
    if (!processedItem) return null
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

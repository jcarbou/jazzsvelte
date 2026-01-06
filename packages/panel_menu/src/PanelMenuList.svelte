<script lang="ts">
    import { isPrintableCharacter } from '@jazzsvelte/object'
    import type { PanelMenuListProps, PanelMenuTreeContext, ProcessedItem } from './panelMenu.types'
    import { hasItem } from './panelMenu.utils'
    import type { TimeoutId } from '@jazzsvelte/api'
    import { findSingleEl, focusEl } from '@jazzsvelte/dom'
    import { getContext } from 'svelte'
    import PanelMenuSub from './PanelMenuSub.svelte'

    let { panelId, onToggle, onHeaderFocus, modelWrapper }: PanelMenuListProps = $props()

    type FocusChangeEvent = {
        originalEvent: FocusEvent | KeyboardEvent
        processedItem: ProcessedItem | null | undefined
        focusOnNext?: boolean
        selfCheck?: boolean
        allowHeaderFocus?: boolean
    }

    export const displayName = 'PanelMenuList'
    export function getElement(): HTMLUListElement {
        return panelMenuSub.getElement()
    }

    const { expandedKeys } = getContext<PanelMenuTreeContext>('panelMenuTree')

    let panelMenuSub: PanelMenuSub

    let activeItemsState: ProcessedItem[] = $state.raw([])
    let focused: boolean = $state(false)
    let focusedItem: ProcessedItem | null = $state(null)
    let activeItemPath: ProcessedItem[] = $state.raw([])

    let visibleItems: ProcessedItem[] = $derived(flatItems(modelWrapper))
    let focusedItemId: string | null = $derived(focusedItem ? `${panelId}_${focusedItem.id}` : null)

    let searchValue: string | null = null
    let searchTimeout: TimeoutId = null

    function flatItems(
        processedItems: ProcessedItem[] | undefined | null,
        processedFlattenItems: ProcessedItem[] = []
    ): ProcessedItem[] {
        if (!processedItems) return processedFlattenItems
        processedItems.forEach((processedItem) => {
            const active = hasItem(activeItemsState, processedItem)
            const visible = !!processedItem?.isVisible && (processedItem.level === 0 || active)
            if (visible) {
                processedFlattenItems.push(processedItem)
                flatItems(processedItem.items, processedFlattenItems)
            }
        })

        return processedFlattenItems
    }

    function isElementInPanel(event: Event, element: HTMLElement): boolean {
        if (!event.currentTarget) return false
        const targetElement = event.currentTarget as HTMLElement
        const panel = targetElement.closest('[data-pc-section="panel"]')

        return !!panel && panel.contains(element)
    }

    function isValidItem(processedItem: ProcessedItem | undefined | null): boolean {
        return !!processedItem && !processedItem.isDisabled && !processedItem.isSeparator
    }

    function isItemMatched(processedItem: ProcessedItem): boolean {
        let label = processedItem.item.label
        return (
            isValidItem(processedItem) &&
            !!label &&
            !!searchValue &&
            label.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
        )
    }

    function findFirstItem(): ProcessedItem | undefined {
        return visibleItems.find(isValidItem)
    }

    function findLastItem() {
        return visibleItems.findLast(isValidItem)
    }

    function findNextItem(processedItem: ProcessedItem) {
        const index = visibleItems.findIndex((item) => item.key === processedItem.key)
        const matchedItem =
            index < visibleItems.length - 1 ? visibleItems.slice(index + 1).find((pItem) => isValidItem(pItem)) : undefined

        return matchedItem || processedItem
    }

    function findPrevItem(processedItem: ProcessedItem) {
        const index = visibleItems.findIndex((item) => item.key === processedItem.key)
        const matchedItem = index > 0 ? visibleItems.slice(0, index).findLast((pItem) => isValidItem(pItem)) : undefined

        return matchedItem || processedItem
    }

    function searchItems(event: KeyboardEvent, char: string) {
        searchValue = (searchValue || '') + char

        let matchedItem = null
        let matched = false

        if (focusedItem) {
            const focusedItemIndex = visibleItems.findIndex((processedItem) => processedItem.key === focusedItem?.key)

            matchedItem = visibleItems.slice(focusedItemIndex).find((processedItem) => isItemMatched(processedItem))
            matchedItem = !matchedItem
                ? visibleItems.slice(0, focusedItemIndex).find((processedItem) => isItemMatched(processedItem))
                : matchedItem
        } else {
            matchedItem = visibleItems.find((processedItem) => isItemMatched(processedItem))
        }

        if (matchedItem) {
            matched = true
        }

        if (!matchedItem && !focusedItem) {
            matchedItem = findFirstItem()
        }

        if (matchedItem) {
            changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            })
        }

        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        searchTimeout = setTimeout(() => {
            searchValue = ''
            searchTimeout = null
        }, 500)

        return matched
    }

    function changeFocusedItem(event: FocusChangeEvent) {
        const { originalEvent, processedItem, focusOnNext = false, selfCheck = false, allowHeaderFocus = true } = event
        if (!processedItem) return
        if (focusedItem?.key !== processedItem.key) {
            focusedItem = processedItem
            scrollInView()
        } else if (allowHeaderFocus) {
            onHeaderFocus({ originalEvent, focusOnNext, selfCheck })
        }
    }

    function scrollInView() {
        const element = findSingleEl(getElement(), `li[id="${`${focusedItemId}`}"]`)

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' })
        }
    }

    function findProcessedItemByItemKey(
        key: string,
        processedItems: ProcessedItem[] | null = null,
        level = 0
    ): ProcessedItem | null {
        const _processedItems = processedItems ? processedItems : level === 0 && modelWrapper

        if (!_processedItems) {
            return null
        }

        for (let i = 0; i < _processedItems.length; i++) {
            const processedItem = _processedItems[i]
            const processedKey = processedItem.key || processedItem.key

            if (processedKey === key) {
                return processedItem
            }

            const matchedItem = findProcessedItemByItemKey(key, processedItem.items, level + 1)

            if (matchedItem) {
                return matchedItem
            }
        }
        return null
    }

    function onFocus(event: FocusEvent) {
        const relatedTarget = event.relatedTarget as HTMLElement | null
        if (!relatedTarget) return
        focused = true
        focusedItem = focusedItem || (isElementInPanel(event, relatedTarget) ? findFirstItem() : findLastItem()) || null
    }

    function onBlur() {
        focused = false
        focusedItem = null
        searchValue = ''
    }

    function onKeyDown(event: KeyboardEvent) {
        const metaKey = event.metaKey || event.ctrlKey

        switch (event.code) {
            case 'ArrowDown':
                onArrowDownKey(event)
                break

            case 'ArrowUp':
                onArrowUpKey(event)
                break

            case 'ArrowLeft':
                onArrowLeftKey(event)
                break

            case 'ArrowRight':
                onArrowRightKey(event)
                break

            case 'Home':
                onHomeKey(event)
                break

            case 'End':
                onEndKey(event)
                break

            case 'Space':
                onSpaceKey(event)
                break

            case 'Enter':
            case 'NumpadEnter':
                onEnterKey(event)
                break

            case 'Escape':
            case 'Tab':
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    searchItems(event, event.key)
                }

                break
        }
    }

    function onArrowDownKey(event: KeyboardEvent) {
        const processedItem = focusedItem ? findNextItem(focusedItem) : findFirstItem()
        if (!processedItem) return
        changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true })
        event.preventDefault()
    }

    function onArrowUpKey(event: KeyboardEvent) {
        const processedItem = focusedItem ? findPrevItem(focusedItem) : findLastItem()
        if (!processedItem) return
        changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true })
        event.preventDefault()
    }

    function onArrowLeftKey(event: KeyboardEvent) {
        if (!focusedItem) return
        const matched = activeItemPath.some((p) => p.key === focusedItem?.key)

        if (matched) {
            activeItemPath = activeItemPath.filter((p) => p.key !== focusedItem?.key)
        } else {
            focusedItem = focusedItem.parent ? focusedItem.parent : focusedItem
        }

        event.preventDefault()
    }

    function onArrowRightKey(event: KeyboardEvent) {
        if (!focusedItem) return
        const grouped = focusedItem.isGrouped

        if (grouped) {
            const matched = activeItemPath.some((p) => p.key === focusedItem?.key)

            if (matched) {
                onArrowDownKey(event)
            } else {
                const _activeItemPath = activeItemPath.filter((p) => p.parentKey !== focusedItem?.parentKey)
                _activeItemPath.push(focusedItem)
                activeItemPath = _activeItemPath
            }
        }

        event.preventDefault()
    }

    function onHomeKey(event: KeyboardEvent) {
        changeFocusedItem({ originalEvent: event, processedItem: findFirstItem(), allowHeaderFocus: false })
        event.preventDefault()
    }

    function onEndKey(event: KeyboardEvent) {
        changeFocusedItem({ originalEvent: event, processedItem: findLastItem(), focusOnNext: true, allowHeaderFocus: false })
        event.preventDefault()
    }

    function onEnterKey(event: KeyboardEvent) {
        if (!focusedItem) return
        const element = findSingleEl(getElement(), `li[id="${`${focusedItemId}`}"]`)
        const anchorElement =
            element && (findSingleEl(element, '[data-pc-section="action"]') || findSingleEl(element, 'a,button'))

        anchorElement ? anchorElement.click() : element && element.click()

        event.preventDefault()
    }

    function onSpaceKey(event: KeyboardEvent) {
        onEnterKey(event)
    }

    function onItemToggle({ processedItem, expanded }: { processedItem: ProcessedItem; expanded: boolean }) {
        if (expandedKeys) {
            onToggle(processedItem, expanded)
        } else {
            const _activeItemPath = activeItemPath.filter((p) => p.parentKey !== processedItem.parentKey)

            expanded && _activeItemPath.push(processedItem)
            activeItemPath = _activeItemPath
        }

        if (processedItem.item) {
            processedItem.item = {
                ...processedItem.item,
                expanded
            }
        }

        focusEl(getElement())
        focusedItem = processedItem
    }

    $effect(() => {
        const _activeItemPath = Object.entries(expandedKeys || {}).reduce<ProcessedItem[]>((acc, [key, val]) => {
            if (val) {
                const processedItem = findProcessedItemByItemKey(key)

                processedItem && acc.push(processedItem)
            }

            return acc
        }, [])

        activeItemPath = _activeItemPath
    })
</script>

<PanelMenuSub
    bind:this={panelMenuSub}
    class="p-submenu-list"
    id={panelId + '_list'}
    role="tree"
    tabIndex={-1}
    ariaActivedescendant={focused ? focusedItemId : null}
    {panelId}
    focusedItemId={focused ? focusedItemId : null}
    {modelWrapper}
    {activeItemPath}
    {onFocus}
    {onBlur}
    {onKeyDown}
    {onItemToggle}
    level={0}
    root
/>

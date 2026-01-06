import { type MenuItem } from '@jazzsvelte/api'
import { findEl, findSingleEl, getAttribute } from '@jazzsvelte/dom'
import type { OnMenuItemSelect } from './menu.utils.types'

type FindItem = (targetEl: HTMLElement, checkDisabled: boolean) => HTMLElement | null

export function onMenuItemAction({
    event,
    item,
    index,
    readOnly,
    onSelect
}: {
    event: MouseEvent | KeyboardEvent
    item: MenuItem
    index: number
    readOnly?: boolean
    onSelect?: OnMenuItemSelect | null
}): boolean {
    if (readOnly || item.disabled) {
        event.preventDefault()
        return false
    }

    let toActivate = true

    if (onSelect) {
        const selectState = onSelect({
            originalEvent: event,
            item,
            index
        })
        toActivate = toActivate && selectState !== false
    }

    if (item.command) {
        const commandState = item.command({
            originalEvent: event,
            item,
            index
        })
        toActivate = toActivate && commandState !== false
    }

    if (!item.url) {
        event.preventDefault()
        event.stopPropagation()
    }

    return toActivate
}

export function onKeyDownMenuItem({
    event,
    item,
    index,
    readOnly,
    checkDisabled
}: {
    event: KeyboardEvent
    item: MenuItem
    index: number
    readOnly: boolean
    checkDisabled: boolean
}) {
    if (readOnly) {
        return
    }
    switch (event.code) {
        case 'ArrowRight':
            navigateTo(event, findNextItem, checkDisabled)
            break
        case 'ArrowLeft':
            navigateTo(event, findPrevItem, checkDisabled)
            break
        case 'Home':
            navigateTo(event, findFirstItem, checkDisabled)
            break
        case 'End':
            navigateTo(event, findLastItem, checkDisabled)
            break
        case 'Space':
        case 'Enter':
        case 'NumpadEnter':
            onMenuItemAction({ event, item, index, readOnly })
            event.preventDefault()
            break

        case 'Tab':
            onTabKey(event)
            break

        default:
            break
    }
}

function setFocusToMenuitem(oldLiEl: HTMLElement, newLiEl: HTMLElement) {
    const oldAnchorEl = oldLiEl.children[0] as HTMLElement
    const newAnchorEl = newLiEl.children[0] as HTMLElement
    oldAnchorEl.tabIndex = -1
    newAnchorEl.tabIndex = 0
    setTimeout(() => newAnchorEl.focus(), 0)
}

function navigateTo(event: KeyboardEvent, findItem: FindItem, checkDisabled: boolean = false) {
    if (event.currentTarget !== null) {
        const oldLiEl = event.currentTarget as HTMLElement,
            newLiEl = findItem(oldLiEl, checkDisabled)
        newLiEl && setFocusToMenuitem(oldLiEl, newLiEl)
    }
    event.preventDefault()
}

function findNextItem(oldLiEl: HTMLElement, checkDisabled: boolean): HTMLElement | null {
    const nextLiEl = oldLiEl.nextElementSibling as HTMLElement | undefined

    if (!nextLiEl) return null
    if (!checkDisabled) return nextLiEl

    return getAttribute(nextLiEl, 'data-p-disabled') === true ? findNextItem(nextLiEl, checkDisabled) : (nextLiEl as HTMLElement)
}

function findPrevItem(itemEl: HTMLElement, checkDisabled: boolean): HTMLElement | null {
    const prevItem = itemEl.previousElementSibling as HTMLElement | undefined

    if (!prevItem) return null
    if (!checkDisabled) return prevItem

    return prevItem
        ? getAttribute(prevItem, 'data-p-disabled') === true
            ? findPrevItem(prevItem as HTMLElement, checkDisabled)
            : (prevItem as HTMLElement)
        : null
}

function findFirstItem(itemEl: HTMLElement, checkDisabled: boolean): HTMLElement | null {
    const selector = `[data-pc-section="menuitem"]${checkDisabled ? '[data-p-disabled="false"' : ''}]`
    const menuEl = itemEl.parentElement
    const newLiEl = findSingleEl(menuEl, selector)

    return newLiEl ? (newLiEl as HTMLElement) : null
}

function findLastItem(itemEl: HTMLElement, checkDisabled: boolean): HTMLElement | null {
    const selector = `[data-pc-section="menuitem"]${checkDisabled ? '[data-p-disabled="false"' : ''}]`
    const menuEl = itemEl.parentElement
    const newLiEl = findEl(menuEl, selector)

    return newLiEl ? (newLiEl[newLiEl.length - 1] as HTMLElement) : null
}

function onTabKey(event: KeyboardEvent) {
    if (event.currentTarget == null) return

    const oldLiEl = event.currentTarget as HTMLElement
    const menuEl = oldLiEl.parentElement

    const activeItem = findSingleEl(menuEl, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]')
    const focusedItem = findSingleEl(menuEl, '[data-pc-section="action"][tabindex="0"]')

    if (focusedItem !== activeItem?.children[0]) {
        activeItem && ((activeItem.children[0] as HTMLElement).tabIndex = 0)
        focusedItem && (focusedItem.tabIndex = -1)
    }
}

export function setFocusToFirstMenuItem(menuEl: HTMLElement) {
    const selector = `[data-pc-section="menuitem"]`
    const newLiEl = findSingleEl(menuEl, selector)

    if (!newLiEl) return

    newLiEl.tabIndex = 0
    newLiEl.focus()
}

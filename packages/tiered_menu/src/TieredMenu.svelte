<script lang="ts">
    import type {
        ActiveItemPathStore,
        FocusedItemInfoStore,
        ProcessedItem,
        ProcessedItemEvent,
        TieredMenuProps,
        TieredMenuPtContext,
        TieredMenuTreeContext
    } from './tieredMenu.types'

    import type { JazzSvelteContext, TimeoutId } from '@jazzsvelte/api'

    import { portal } from '@jazzsvelte/portal_action'
    import { getContext, setContext, tick } from 'svelte'
    import { derived as storeDerived } from 'svelte/store'
    import { mergeCssStyles, resolveDivPt } from '@jazzsvelte/api'
    import { zIndex } from '@jazzsvelte/z_index_action'
    import { defaultTieredMenuProps as DEFAULT, globalTieredMenuPT as globalPt } from './tieredMenu.config'
    import { fade } from 'svelte/transition'
    import TieredMenuSub from './TieredMenuSub.svelte'
    import { OverlayService, createBooleanStore, uniqueId } from '@jazzsvelte/utils'
    import { findSingleEl, focusEl, getOuterWidth, alignOverlay, addStyles } from '@jazzsvelte/dom'
    import {
        createActiveItemPathStore,
        createFocusedItemInfoStore,
        createProcessedItems,
        findFirstFocusedItemIndex,
        findFirstItemIndex,
        findLastFocusedItemIndex,
        findLastItemIndex,
        findNextItemIndex,
        findPrevItemIndex,
        getFocusedItem,
        getFocusedItemParent,
        isSelectedItem,
        searchItemIndex
    } from './tieredMenu.utils'
    import { matchMedia } from '@jazzsvelte/match_media_action'
    import { clickOutside } from '@jazzsvelte/click_outside_action'
    import { windowEvents } from '@jazzsvelte/window_events_action'
    import { isPrintableCharacter } from '@jazzsvelte/object'

    let {
        appendTo = DEFAULT.appendTo,
        autoZIndex = DEFAULT.autoZIndex,
        baseZIndex = DEFAULT.baseZIndex,
        breakpoint = DEFAULT.breakpoint,
        class: className = DEFAULT.class,
        id = null,
        model = DEFAULT.model,
        popup = DEFAULT.popup,
        pt = null,
        ptOptions = null,
        scrollHeight = DEFAULT.scrollHeight,
        style = DEFAULT.style,
        submenuIcon = DEFAULT.submenuIcon,
        unstyled = DEFAULT.unstyled,
        onHide = null,
        onShow = null,
        onBlur = null,
        onFocus = null,
        ..._restProps
    }: TieredMenuProps = $props()

    let _props: TieredMenuProps = $derived({
        appendTo,
        autoZIndex,
        baseZIndex,
        breakpoint,
        class: className,
        id,
        model,
        popup,
        pt,
        ptOptions,
        scrollHeight,
        style,
        submenuIcon,
        unstyled,
        onHide,
        onShow,
        onBlur,
        onFocus
    })

    export const displayName = 'TieredMenu'
    export function getElement(): HTMLDivElement | null {
        return containerEl
    }
    export function toggle(event: Event): void {
        if (popup) {
            visible ? _hide(event) : _show(event)
        }
    }
    export function hide(event: Event): void {
        popup && visible && _hide(event)
    }
    export function show(event: Event): void {
        popup && !visible && _show(event)
    }
    export function isVisible(): boolean {
        return visible
    }

    let visible = $state(!popup)

    let _tieredMenuId: string = $derived(id || uniqueId('tieredMenu_'))

    let ptContext: TieredMenuPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {
            active: false
        },
        state: {
            attributeSelector: '',
            visible
        },
        ptOptions,
        unstyled
    })

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { inputStyle, ripple } = jazzSvelteContext

    let isMobileMode = createBooleanStore(false)
    let popupStyle: string | null = '' // TODO : $state  ?

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-tieredmenu',
                    {
                        'p-tieredmenu-overlay': popup,
                        'p-tieredmenu-isMobile': $isMobileMode,
                        'p-tieredmenu-isPopup': !!popup,
                        'p-input-filled': $inputStyle === 'filled',
                        'p-ripple-disabled': $ripple === false
                    }
                ],
                style: mergeCssStyles([style, popupStyle]),
                'data-pc-name': 'tieredMenu',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    let processedItems: ProcessedItem[] | null = $derived(createProcessedItems(model))
    let matchMediaQuery: string | null = $derived(breakpoint ? `screen and (max-width: ${breakpoint})` : null)
    let focused: boolean = $state(false)
    let activeItemPath: ActiveItemPathStore = createActiveItemPathStore()
    let focusedItemInfo: FocusedItemInfoStore = createFocusedItemInfoStore()
    let visibleItems = storeDerived<[ActiveItemPathStore, FocusedItemInfoStore], ProcessedItem[]>(
        [activeItemPath, focusedItemInfo],
        ([$activeItemPath, $focusedItemInfo]) => {
            const processedItem = $activeItemPath.find((p) => p.key === $focusedItemInfo.parentKey)
            const processed = processedItem ? processedItem.items : processedItems
            return processed || []
        }
    )
    // svelte-ignore non_reactive_update
    let menu: TieredMenuSub
    let dirty: boolean = false
    let relatedTargetEl: HTMLElement | null = null
    let targetEl: HTMLElement | null = null
    // svelte-ignore non_reactive_update
    let containerEl: HTMLDivElement | null = null

    let focusedItemId = $derived(
        $focusedItemInfo.index !== -1
            ? `${_tieredMenuId}${$focusedItemInfo.parentKey ? '_' + $focusedItemInfo.parentKey : ''}_${$focusedItemInfo.index}`
            : null
    )
    let searchValue: string | null = null
    let searchTimeoutId: TimeoutId = null

    function onItemChange(event: ProcessedItemEvent) {
        const { processedItem, isFocus } = event

        if (!processedItem) return

        activeItemPath.add(processedItem)
        focusedItemInfo.setByProcessedItem(processedItem)
        dirty = dirty || !!processedItem.items

        isFocus && focusEl(menu.getElement())
    }

    function onItemMouseEnter(event: ProcessedItemEvent) {
        const { originalEvent, processedItem } = event

        if (processedItem.item.disabled || $isMobileMode) {
            originalEvent.preventDefault()
            return
        }

        if (dirty && !popup) {
            onItemChange(event)
        }
    }

    function onItemClick(event: ProcessedItemEvent) {
        const { originalEvent, processedItem } = event

        if (processedItem.item.disabled) {
            return
        }

        const grouped = processedItem.isGrouped
        const root = processedItem.isRoot
        const selected = isSelectedItem($activeItemPath, processedItem)
        const menuElement = menu.getElement()

        if (selected) {
            const { key } = processedItem

            activeItemPath.filter((p) => key !== p.key && key.startsWith(p.key))
            focusedItemInfo.setByProcessedItem(processedItem)

            if (!grouped) {
                dirty = !root
            }

            setTimeout(() => {
                focusEl(menuElement)

                if (grouped) {
                    dirty = true
                }
            }, 0)
        } else if (grouped) {
            focusEl(menuElement)
            onItemChange(event)
        } else {
            const rootProcessedItem = root ? processedItem : $activeItemPath.find((p) => p.parentKey === null)
            const rootProcessedItemIndex = rootProcessedItem ? rootProcessedItem.index : -1

            _hide(originalEvent, true)
            focusedItemInfo.set({
                index: rootProcessedItemIndex,
                parentKey: rootProcessedItem ? rootProcessedItem.parentKey : null
            })
        }
    }

    async function _show(event: Event) {
        focusedItemInfo.set({ index: findFirstFocusedItemIndex($activeItemPath, $visibleItems), level: 0, parentKey: null })
        if (popup) {
            targetEl = event.currentTarget as HTMLElement
            visible = true
            onShow && onShow(event)
            relatedTargetEl = ((event as MouseEvent).relatedTarget as HTMLElement) || null
            await tick()
            onPopupShow()
        }
    }

    function _hide(event: Event, isFocus?: boolean) {
        if (popup) {
            visible = false
            onHide && onHide(event)
        }

        const menuElement = menu.getElement()

        activeItemPath.clear()
        focusedItemInfo.clear()
        isFocus && focusEl(relatedTargetEl || targetEl || menuElement)
        dirty = false
    }

    function onArrowUpKey(event: KeyboardEvent) {
        const focusItemIndex = $focusedItemInfo.index
        if (event.altKey) {
            if (popup && targetEl) {
                focusEl(targetEl)
            }

            if (focusItemIndex !== -1) {
                const processedItem = $visibleItems[focusItemIndex]
                const grouped = !!processedItem?.items?.length

                !grouped && onItemChange({ originalEvent: event, processedItem })
            }

            popup && _hide(event, true)
            event.preventDefault()
        } else {
            const itemIndex =
                focusItemIndex !== -1
                    ? findPrevItemIndex($visibleItems, focusItemIndex)
                    : findLastFocusedItemIndex($activeItemPath, $visibleItems)

            changeFocusedItemIndex(itemIndex)
            event.preventDefault()
        }
    }

    function onArrowDownKey(event: KeyboardEvent) {
        const focusItemIndex = $focusedItemInfo.index
        const itemIndex =
            focusItemIndex !== -1
                ? findNextItemIndex($visibleItems, focusItemIndex)
                : findFirstFocusedItemIndex($activeItemPath, $visibleItems)

        changeFocusedItemIndex(itemIndex)
        event.preventDefault()
    }

    function onArrowLeftKey(event: KeyboardEvent): void {
        const processedItem = getFocusedItem($focusedItemInfo, $visibleItems)
        const parentItem = getFocusedItemParent($activeItemPath, $focusedItemInfo, $visibleItems)
        const root = processedItem?.isRoot

        if (!root) {
            focusedItemInfo.set({ index: parentItem?.index ?? -1, parentKey: parentItem?.parentKey || null })
            searchValue = ''
        }

        activeItemPath.filter((p) => p.parentKey !== $focusedItemInfo.parentKey)

        event.preventDefault()
    }

    function onArrowRightKey(event: KeyboardEvent): void {
        const processedItem = getFocusedItem($focusedItemInfo, $visibleItems)

        if (processedItem?.isGrouped) {
            onItemChange({ originalEvent: event, processedItem })
            focusedItemInfo.set({ index: 0, parentKey: processedItem.key })
            searchValue = ''
        }

        event.preventDefault()
    }

    function onHomeKey(event: KeyboardEvent): void {
        changeFocusedItemIndex(findFirstItemIndex($visibleItems))
        event.preventDefault()
    }

    function onEndKey(event: KeyboardEvent): void {
        changeFocusedItemIndex(findLastItemIndex($visibleItems))
        event.preventDefault()
    }

    function onEnterKey(event: KeyboardEvent): void {
        if ($focusedItemInfo.index !== -1) {
            const element = findSingleEl(menu.getElement(), `li[id="${`${focusedItemId}`}"]`)
            const anchorElement = element && findSingleEl(element, '[data-pc-section="action"]')

            popup && targetEl && focusEl(targetEl)
            anchorElement ? anchorElement.click() : element && element.click()
        }

        event.preventDefault()
    }

    function onEscapeKey(event: KeyboardEvent): void {
        _hide(event, true)
        if (!popup) {
            focusedItemInfo.partialUpdate({ index: findFirstFocusedItemIndex($activeItemPath, $visibleItems) })
        }

        event.preventDefault()
    }

    function onTabKey(event: Event): void {
        if ($focusedItemInfo.index !== -1) {
            const processedItem = getFocusedItem($focusedItemInfo, $visibleItems)

            if (processedItem) {
                !processedItem.isGrouped && onItemChange({ originalEvent: event, processedItem })
            }
        }

        _hide(event)
    }

    function changeFocusedItemIndex(index: number) {
        if ($focusedItemInfo.index !== index) {
            focusedItemInfo.partialUpdate({ index })
            scrollInView()
        }
    }

    function scrollInView(index: number = -1) {
        const elementId = index !== -1 ? `${_tieredMenuId}_${index}` : focusedItemId
        const element = findSingleEl(menu.getElement(), `li[id="${elementId}"]`)

        element?.scrollIntoView?.({ block: 'nearest', inline: 'start' })
    }

    function searchItem(char: string): boolean {
        searchValue = (searchValue || '') + char

        const itemIndex = searchItemIndex($activeItemPath, $focusedItemInfo, $visibleItems, searchValue)

        if (itemIndex !== -1) {
            changeFocusedItemIndex(itemIndex)
        }

        if (searchTimeoutId) {
            clearTimeout(searchTimeoutId)
        }

        searchTimeoutId = setTimeout(() => {
            searchValue = ''
            searchTimeoutId = null
        }, 500)

        return itemIndex !== -1
    }

    function onPopupShow(): void {
        if (!containerEl || !targetEl) return

        addStyles(containerEl, { position: 'absolute', top: '0', left: '0' })
        const calculateMinWidth = getOuterWidth(targetEl) > getOuterWidth(containerEl)

        alignOverlay(containerEl, targetEl, appendTo, calculateMinWidth)

        const m = menu.getElement()
        focusEl(m)
        scrollInView()

        popupStyle = containerEl.getAttribute('style')
        if (breakpoint) {
            //containerEl.setAttribute(attributeSelectorState, '');
            //createStyle();
        }
    }

    function _onFocus(event: Event): void {
        focused = true
        focusedItemInfo.updateIfNotSet({
            index: findFirstFocusedItemIndex($activeItemPath, $visibleItems),
            level: 0,
            parentKey: null
        })

        onFocus && onFocus(event)
    }

    function _onBlur(event: Event): void {
        focused = false
        focusedItemInfo.clear()
        searchValue = ''
        dirty = false
        onBlur && onBlur(event)
    }

    function onKeyDown(event: KeyboardEvent): void {
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
            case 'Enter':
            case 'NumpadEnter':
                onEnterKey(event)
                break

            case 'Escape':
                popup && targetEl && focusEl(targetEl)
                onEscapeKey(event)
                break

            case 'Tab':
                onTabKey(event)
                break

            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    searchItem(event.key)
                }

                break
        }
    }

    function onRootClick(event: MouseEvent): void {
        if (popup && targetEl) {
            OverlayService.emit('overlay-click', {
                originalEvent: event,
                target: targetEl
            })
        }
    }

    function onClickOutside(event: Event): void {
        if (!visible) return

        // Defer hide to be compliant with toggle function (toggle must be call before _hide)
        _hide(event, !popup)
    }

    //let tieredMenuTreeContext: TieredMenuTreeContext = $derived()

    // setContext<TieredMenuTreeContext>('tieredMenuTree', tieredMenuTreeContext)

    // $effect(() => {
    setContext<TieredMenuTreeContext>('tieredMenuTree', {
        menuId: _tieredMenuId,
        popup,
        submenuIcon,
        pt,
        ptContext,
        hostName: 'TieredMenu',
        onItemClick,
        onFocus: _onFocus,
        onBlur: _onBlur,
        onKeyDown,
        onItemMouseEnter,
        ariaLabel: _restProps['aria-label'] || undefined,
        ariaOrientation: 'vertical',
        activeItemPath,
        isMobileMode: () => $isMobileMode
    })
    // })
</script>

{#if processedItems && visible}
    <div
        id={_tieredMenuId}
        {...rootAttributes}
        {..._restProps}
        bind:this={containerEl}
        transition:fade={{ duration: 300 }}
        role="none"
        onclick={onRootClick}
        onclickoutside={onClickOutside}
        use:portal={popup ? 'body' : 'none'}
        use:windowEvents={{ resize: (ev) => !$isMobileMode && _hide(ev, true) }}
        use:clickOutside={{ getAdditionalElements: () => [targetEl] }}
        use:zIndex={{ key: 'menu', jazzSvelteContext, autoZIndex, baseZIndex }}
        use:matchMedia={{ query: matchMediaQuery, matches: isMobileMode }}
    >
        <TieredMenuSub
            id={_tieredMenuId + '_list'}
            bind:this={menu}
            menuProps={_props}
            model={processedItems}
            aria-labelledby={_restProps['aria-labelledby'] || undefined}
            ariaActiveDescendant={focused ? focusedItemId : undefined}
            level={0}
            root
            {focusedItemId}
            style={$isMobileMode ? { 'max-height': scrollHeight, overflow: scrollHeight ? 'auto' : '' } : {}}
        />
    </div>
{/if}

<style>
    @layer primereact {
        .p-tieredmenu-overlay {
            position: absolute;
        }

        .p-tieredmenu :global(ul) {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .p-tieredmenu :global(.p-submenu-list) {
            position: absolute;
            min-width: 100%;
            z-index: 1;
            display: none;
        }

        .p-tieredmenu :global(.p-menuitem-link) {
            cursor: pointer;
            display: flex;
            align-items: center;
            text-decoration: none;
            overflow: hidden;
            position: relative;
        }

        .p-tieredmenu :global(.p-menuitem-text) {
            line-height: 1;
        }

        .p-tieredmenu :global(.p-menuitem) {
            position: relative;
        }

        .p-tieredmenu :global(.p-menuitem-link) :global(.p-submenu-icon) {
            margin-left: auto;
        }

        .p-tieredmenu :global(.p-menuitem-active) > :global(.p-submenu-list) {
            display: block;
            left: 100%;
            top: 0;
        }

        .p-tieredmenu :global(.p-menuitem-active) > :global(.p-submenu-list-flipped) {
            left: -100%;
        }

        /** is mobole **/

        .p-tieredmenu.p-tieredmenu-isMobile.p-tieredmenu-isPopup {
            width: 100%;
        }
        /*    ${!props.popup ? `.p-tieredmenu[${selector}] { width: 100%; }` : ''}*/

        .p-tieredmenu.p-tieredmenu-isMobile :global(.p-submenu-list) {
            position: relative;
        }

        .p-tieredmenu.p-tieredmenu-isMobile :global(.p-menuitem-active) > :global(.p-submenu-list) {
            left: 0;
            box-shadow: none;
            border-radius: 0;
            padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */
        }

        .p-tieredmenu.p-tieredmenu-isMobile :global(.p-menuitem-active) > :global(.p-menuitem-link) > :global(.p-submenu-icon) {
            transform: rotate(-180deg);
        }

        .p-tieredmenup-tieredmenu-isMobile :global(.p-submenu-icon:before) {
            content: '\\e930';
        }
    }
</style>

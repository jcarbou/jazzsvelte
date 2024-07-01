<script lang="ts">
    import type {
        FocusedItemInfo,
        ModelContext,
        ProcessedItem,
        ProcessedItemEvent,
        TieredMenuPassThroughMethodOptions,
        TieredMenuPassThroughOptions,
        TieredMenuTreeContext
    } from './tieredMenu.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        IconComponent,
        CssStyle,
        PassThroughOptions,
        MenuItem,
        AppendTo,
        OnEvent
    } from '@jazzsvelte/api'

    import { getContext, setContext } from 'svelte'
    import { resolvePT, zIndex } from '@jazzsvelte/api'
    import { defaultTieredMenuProps as DEFAULT, globalTieredMenuPT as globalPt } from './tieredMenu.config'
    import { fade } from 'svelte/transition'
    import TieredMenuSub from './TieredMenuSub.svelte'
    import { OverlayService, createBooleanStore, uniqueId } from '@jazzsvelte/utils'
    import { findSingleEl, focusEl, getOuterWidth, alignOverlay, addStyles } from '@jazzsvelte/dom'
    import {
        addActiveItem,
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
    import { windowResize } from '@jazzsvelte/window_resize_action'
    import { isPrintableCharacter } from '@jazzsvelte/object'

    export let appendTo: AppendTo = DEFAULT.appendTo
    export let autoZIndex: boolean = DEFAULT.autoZIndex
    export let baseZIndex: number = DEFAULT.baseZIndex
    export let breakpoint: string | null = DEFAULT.breakpoint
    export let model: MenuItem[] = DEFAULT.model
    export let popup: boolean = DEFAULT.popup
    export let scrollHeight: string | null = DEFAULT.scrollHeight
    export let submenuIcon: string | IconComponent | null = DEFAULT.submenuIcon
    //export let transitionOptions: CSSTransitionProps = DEFAULT.transitionOptions
    export let unstyled: boolean = DEFAULT.unstyled
    export let pt: TieredMenuPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

    export let onHide: OnEvent = null
    export let onShow: OnEvent = null
    export let onBlur: OnEvent = null
    export let onFocus: OnEvent = null

    export const displayName = 'TieredMenu'
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

    let visible: boolean = false
    const id = uniqueId('tieredMenu_')

    $: ptContext = {
        props: $$props,
        context: {
            active: false
        },
        state: {
            attributeSelector: '',
            visible
        },
        ptOptions,
        unstyled
    } satisfies TieredMenuPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { inputStyle, ripple } = jazzSvelteContext

    // "root element"
    $: rootAttributes = resolvePT(
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
            style,
            'data-pc-name': 'tieredMenu',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "transition" element
    /*$: transitionAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'transition'
        },
        pt?.transition,
        globalPt?.transition,
        ptContext
    ) satisfies HTMLTieredMenuPassThroAttributes*/

    $: processedItems = createProcessedItems(model) satisfies ProcessedItem[] | null
    $: matchMediaQuery = breakpoint ? `screen and (max-width: ${breakpoint})` : (null satisfies string | null)
    let focused: boolean = false
    let isMobileMode = createBooleanStore(false)
    let menu: TieredMenuSub
    let activeItemPath: ProcessedItem[] = []
    let visibleItems: ProcessedItem[] = []
    let focusedItemInfo: FocusedItemInfo = { index: -1, level: 0, parentKey: '' }
    let dirty: boolean = false
    let relatedTargetEl: HTMLElement | null = null
    let targetEl: HTMLElement | null = null
    let containerEl: HTMLDivElement | null = null
    $: focusedItemId =
        focusedItemInfo.index !== -1
            ? `${id}${focusedItemInfo.parentKey ? '_' + focusedItemInfo.parentKey : ''}_${focusedItemInfo.index}`
            : null
    let searchValue: string | null = null
    let searchTimeoutId: ReturnType<typeof setTimeout> | null = null
    let focusTrigger: boolean = false

    function modelContext(): ModelContext {
        return {
            activeItemPath,
            visibleItems,
            focusedItemInfo
        }
    }

    function onItemChange(event: ProcessedItemEvent) {
        const { processedItem, isFocus } = event
        const result = addActiveItem(modelContext(), processedItem)

        if (!result) return

        focusedItemInfo = result.newFocusedItemInfo
        activeItemPath = result.newActiveItemPath
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

        if (processedItem.item.disabled || $isMobileMode) {
            return
        }

        const context = modelContext()
        const grouped = processedItem.isGrouped
        const root = processedItem.isRoot
        const selected = isSelectedItem(context, processedItem)
        const menuElement = menu.getElement()

        if (selected) {
            const { index, key, level, parentKey } = processedItem

            activeItemPath = activeItemPath.filter((p) => key !== p.key && key.startsWith(p.key))
            focusedItemInfo = { index, level, parentKey }

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
            const rootProcessedItem = root ? processedItem : activeItemPath.find((p) => p.parentKey === null)
            const rootProcessedItemIndex = rootProcessedItem ? rootProcessedItem.index : -1

            _hide(originalEvent, true)
            focusedItemInfo = { index: rootProcessedItemIndex, parentKey: rootProcessedItem ? rootProcessedItem.parentKey : '' }
        }
    }

    function _show(event: Event): void {
        if (popup) {
            targetEl = event.currentTarget as HTMLElement
            visible = true
            onShow && onShow(event)
            relatedTargetEl = ((event as MouseEvent).relatedTarget as HTMLElement) || null
        }
        const context = modelContext()

        focusedItemInfo = { index: findFirstFocusedItemIndex(context), level: 0, parentKey: '' }
    }

    function _hide(event: Event, isFocus?: boolean) {
        if (popup) {
            visible = false
            onHide && onHide(event)
        }

        const menuElement = menu.getElement()

        activeItemPath = []
        focusedItemInfo = { index: -1, level: 0, parentKey: '' }
        isFocus && focusEl(relatedTargetEl || targetEl || menuElement)
        dirty = false
    }

    function onArrowUpKey(event: KeyboardEvent) {
        const context = modelContext()
        if (event.altKey) {
            if (popup && targetEl) {
                focusEl(targetEl)
            }

            if (focusedItemInfo.index !== -1) {
                const processedItem = visibleItems[focusedItemInfo.index]
                const grouped = !!processedItem?.items?.length

                !grouped && onItemChange({ originalEvent: event, processedItem })
            }

            popup && _hide(event, true)
            event.preventDefault()
        } else {
            const itemIndex =
                focusedItemInfo.index !== -1
                    ? findPrevItemIndex(context, focusedItemInfo.index)
                    : findLastFocusedItemIndex(context)

            changeFocusedItemIndex(itemIndex)
            event.preventDefault()
        }
    }

    function onArrowDownKey(event: KeyboardEvent) {
        const context = modelContext()
        const itemIndex =
            focusedItemInfo.index !== -1 ? findNextItemIndex(context, focusedItemInfo.index) : findFirstFocusedItemIndex(context)

        changeFocusedItemIndex(itemIndex)
        event.preventDefault()
    }

    function onArrowLeftKey(event: KeyboardEvent): void {
        const context = modelContext()
        const processedItem = getFocusedItem(context)
        const parentItem = getFocusedItemParent(context)
        const root = processedItem?.isRoot

        if (!root) {
            focusedItemInfo = { index: -1, parentKey: parentItem?.parentKey || '' }
            searchValue = ''
            setTimeout(() => (focusTrigger = true), 0)
        }

        activeItemPath = activeItemPath.filter((p) => p.parentKey !== focusedItemInfo.parentKey)

        event.preventDefault()
    }

    function onArrowRightKey(event: KeyboardEvent): void {
        const context = modelContext()
        const processedItem = getFocusedItem(context)
        const grouped = processedItem.isGrouped

        if (grouped) {
            onItemChange({ originalEvent: event, processedItem })
            focusedItemInfo = { index: -1, parentKey: processedItem.key }
            searchValue = ''
            setTimeout(() => (focusTrigger = true), 0)
        }

        event.preventDefault()
    }

    function onHomeKey(event: KeyboardEvent): void {
        const context = modelContext()
        changeFocusedItemIndex(findFirstItemIndex(context))
        event.preventDefault()
    }

    function onEndKey(event: KeyboardEvent): void {
        const context = modelContext()
        changeFocusedItemIndex(findLastItemIndex(context))
        event.preventDefault()
    }

    function onEnterKey(event: KeyboardEvent): void {
        if (focusedItemInfo.index !== -1) {
            const element = findSingleEl(menu.getElement(), `li[id="${`${focusedItemId}`}"]`)
            const anchorElement = element && findSingleEl(element, '[data-pc-section="action"]')

            popup && targetEl && focusEl(targetEl)
            anchorElement ? anchorElement.click() : element && element.click()
        }

        event.preventDefault()
    }

    function onEscapeKey(event: KeyboardEvent): void {
        const context = modelContext()

        _hide(event, true)
        if (!popup) {
            focusedItemInfo = { ...focusedItemInfo, index: findFirstFocusedItemIndex(context) }
        }

        event.preventDefault()
    }

    function onTabKey(event: Event): void {
        const context = modelContext()

        if (focusedItemInfo.index !== -1) {
            const processedItem = getFocusedItem(context)
            const grouped = processedItem.isGrouped

            !grouped && onItemChange({ originalEvent: event, processedItem })
        }

        _hide(event)
    }

    function changeFocusedItemIndex(index: number) {
        if (focusedItemInfo.index !== index) {
            focusedItemInfo = { ...focusedItemInfo, index }
            scrollInView()
        }
    }

    function scrollInView(index: number = -1) {
        const elementId = index !== -1 ? `${id}_${index}` : focusedItemId
        const element = findSingleEl(menu.getElement(), `li[id="${elementId}"]`)

        element?.scrollIntoView?.({ block: 'nearest', inline: 'start' })
    }

    function searchItem(char: string): boolean {
        const context = modelContext()

        searchValue = (searchValue || '') + char

        const itemIndex = searchItemIndex(context, searchValue)

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

    function _alignOverlay(): void {
        if (!containerEl || !targetEl) return
        const calculateMinWidth = getOuterWidth(targetEl) > getOuterWidth(containerEl)

        alignOverlay(containerEl, targetEl, appendTo, calculateMinWidth)
    }

    /* function onEnter(): void {
        //if (autoZIndex) {
        //    ZIndexUtils.set('menu', containerEl, jazzSvelteContext.autoZIndex, baseZIndex || jazzSvelteContext.zIndex?.menu)
        //}

        addStyles(containerEl, { position: 'absolute', top: '0', left: '0' })
        _alignOverlay()
        focusEl(menu.getElement())
        scrollInView()

        if (breakpoint) {
            //containerEl.setAttribute(attributeSelectorState, '');
            //createStyle();
        }
    }*/

    function _onFocus(event: Event): void {
        const context = modelContext()
        focused = true
        focusedItemInfo =
            focusedItemInfo.index !== -1
                ? focusedItemInfo
                : { index: findFirstFocusedItemIndex(context), level: 0, parentKey: '' }

        onFocus && onFocus(event)
    }

    function _onBlur(event: Event): void {
        focused = true
        focusedItemInfo = { index: -1, level: 0, parentKey: '' }
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

            case 'Space':
            case 'End':
                onEndKey(event)
                break

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

    setContext<TieredMenuTreeContext>('tieredMenuTree', {
        menuId: id,
        popup,
        submenuIcon,
        unstyled,
        pt,
        ptOptions,
        hostName: 'TieredMenu',
        onItemClick,
        onFocus: _onFocus,
        onBlur: _onBlur,
        onKeyDown,
        onItemMouseEnter,
        ariaLabel: $$restProps.ariaLabel,
        ariaOrientation: 'vertical',
        modelContext,
        isMobileMode: () => $isMobileMode
    })
</script>

{#if processedItems && visible}
    <div
        {...rootAttributes}
        {...$$restProps}
        bind:this={containerEl}
        transition:fade={{ duration: 300 }}
        role="none"
        on:click={onRootClick}
        on:clickoutside={(ev) => _hide(ev, !popup)}
        on:windowresize={(ev) => !$isMobileMode && _hide(ev, true)}
        use:windowResize
        use:clickOutside={{ getAdditionalElements: () => [targetEl] }}
        use:zIndex={{ key: 'menu', jazzSvelteContext }}
        use:matchMedia={{ query: matchMediaQuery, matches: isMobileMode }}
    >
        <TieredMenuSub
            id={id + '_list'}
            bind:this={menu}
            menuProps={$$props}
            model={processedItems}
            ariaLabelledBy={$$restProps.ariaLabelledBy}
            level={0}
            onHide={_hide}
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

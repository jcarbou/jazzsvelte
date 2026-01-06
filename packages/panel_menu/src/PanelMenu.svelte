<script lang="ts">
    import { slide } from 'svelte/transition'
    import type {
        PanelMenuContext,
        PanelMenuFocusContext,
        PanelMenuItem,
        PanelMenuItemSnippetOptions,
        PanelMenuProps,
        PanelMenuPtContext,
        PanelMenuTreeContext,
        ProcessedItem
    } from './panelMenu.types'
    import { setContext } from 'svelte'
    import { resolveIconPT, resolveDivPt, resolveAnchorPt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultPanelMenuProps as DEFAULT, globalPanelMenuPT as globalPt } from './panelMenu.config'
    import { uniqueId } from '@jazzsvelte/utils'
    import { findSingleEl, focusEl, getAttribute } from '@jazzsvelte/dom'
    import { createProcessedItems, hasItem } from './panelMenu.utils'
    import PanelMenuList from './PanelMenuList.svelte'

    let {
        children,
        expandedKeys = $bindable<string[] | null>(null),
        id = null,
        itemSnippet = DEFAULT.itemSnippet,
        model = DEFAULT.model,
        multiple = DEFAULT.multiple,
        submenuIcon = DEFAULT.submenuIcon,
        activeSubmenuIcon = DEFAULT.activeSubmenuIcon,
        unstyled = DEFAULT.unstyled,
        onHide = null,
        onShow = null,
        onOpen = null,
        onClose = null,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: PanelMenuProps = $props()

    let _props: PanelMenuProps = $derived({
        expandedKeys,
        id,
        itemSnippet,
        model,
        multiple,
        pt,
        ptOptions,
        style,
        submenuIcon,
        activeSubmenuIcon,
        unstyled,
        onHide,
        onShow,
        onOpen,
        onClose,
        class: className
    })

    export const displayName = 'PanelMenu'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    export function expandAll() {
        activeItemsState = [...modelWrapper]
    }

    export function collapseAll() {
        activeItemsState = []
    }

    export function toggleAll() {
        activeItemsState.length ? collapseAll() : expandAll()
    }

    export function setExpand(items: PanelMenuItem[]) {
        activeItemsState = modelWrapper.filter((processedItem) => items.includes(processedItem.item))
    }

    let rootEl: HTMLDivElement
    let activeItemsState: ProcessedItem[] = $state.raw([])

    let idState: string = $derived(id || uniqueId('panelMenu_'))
    let modelWrapper: ProcessedItem[] = $derived(createProcessedItems(model))
    let ptContext: PanelMenuPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: null,
        state: {
            id: idState,
            activeItems: activeItemsState.map((activeItem) => activeItem.item)
        },
        ptOptions,
        unstyled
    })

    function onItemClick(event: KeyboardEvent | MouseEvent, processedItem: ProcessedItem) {
        const { item, index } = processedItem
        const { disabled, command, url, items } = item

        if (disabled) {
            event.preventDefault()

            return
        }

        if (command) {
            command({
                originalEvent: event,
                item,
                index
            })
        }

        if (items) {
            changeActiveItem(event, processedItem)
        }

        if (!url) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    function isItemActive(processedItem: ProcessedItem | undefined | null) {
        return !!processedItem && hasItem(activeItemsState, processedItem)
    }

    function isItemFocused(processedItem: ProcessedItem | undefined | null) {
        return !!processedItem && hasItem(activeItemsState, processedItem)
    }

    function onHeaderKeyDown(event: KeyboardEvent, processedItem: ProcessedItem) {
        switch (event.code) {
            case 'ArrowDown':
                onHeaderArrowDownKey(event)
                break

            case 'ArrowUp':
                onHeaderArrowUpKey(event)
                break

            case 'Home':
                onHeaderHomeKey(event)
                break

            case 'End':
                onHeaderEndKey(event)
                break

            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
                onHeaderEnterKey(event, processedItem)
                break

            default:
                break
        }
    }

    function onHeaderArrowDownKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as HTMLElement | null
        const rootList =
            getAttribute(currentTarget, 'data-p-highlight') === true
                ? findSingleEl(currentTarget?.nextElementSibling, '[data-pc-section="menu"]')
                : null

        rootList ? focusEl(rootList) : updateFocusedHeader({ originalEvent: event, focusOnNext: true })
        event.preventDefault()
    }

    function onHeaderArrowUpKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as HTMLElement | null
        if (!currentTarget) return
        const prevHeader = findPrevHeader(currentTarget.parentElement) || findLastHeader()
        const rootList =
            prevHeader && getAttribute(prevHeader, 'data-p-highlight') === true
                ? findSingleEl(prevHeader.nextElementSibling, '[data-pc-section="menu"]')
                : null

        rootList ? focusEl(rootList) : updateFocusedHeader({ originalEvent: event, focusOnNext: false })
        event.preventDefault()
    }

    function onHeaderHomeKey(event: KeyboardEvent | FocusEvent) {
        changeFocusedHeader(event, findFirstHeader())
        event.preventDefault()
    }

    function onHeaderEndKey(event: KeyboardEvent | FocusEvent) {
        changeFocusedHeader(event, findLastHeader())
        event.preventDefault()
    }

    function onHeaderEnterKey(event: KeyboardEvent, processedItem: ProcessedItem) {
        const currentTarget = event.currentTarget as HTMLElement | null
        const headerAction = findSingleEl(currentTarget, '[data-pc-section="headeraction"]')

        headerAction ? headerAction.click() : onItemClick(event, processedItem)
        event.preventDefault()
    }

    function findNextHeader(panelElement: Element | null | undefined, selfCheck: boolean = false) {
        if (!panelElement) return null
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling
        const headerElement = findSingleEl(nextPanelElement, '[data-pc-section="header"]')

        if (!headerElement) return null
        if (!getAttribute(headerElement, 'data-p-disabled')) return headerElement
        if (!headerElement.parentElement) return null
        return findNextHeader(headerElement.parentElement)
    }

    function findPrevHeader(panelElement: Element | null | undefined, selfCheck: boolean = false) {
        if (!panelElement) return null
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling
        const headerElement = findSingleEl(prevPanelElement, '[data-pc-section="header"]')

        if (!headerElement) return null
        if (!getAttribute(headerElement, 'data-p-disabled')) return headerElement
        if (!headerElement.parentElement) return null
        return findPrevHeader(headerElement.parentElement)
    }

    function findFirstHeader() {
        return findNextHeader(rootEl.firstElementChild, true)
    }

    function findLastHeader() {
        return findPrevHeader(rootEl.lastElementChild, true)
    }

    function updateFocusedHeader(event: PanelMenuFocusContext) {
        const { originalEvent, focusOnNext, selfCheck } = event
        const currentTarget = originalEvent.currentTarget as HTMLElement | null
        if (!currentTarget) return
        const panelElement = currentTarget.closest('[data-pc-section="panel"]')
        if (!panelElement) return
        const header = selfCheck
            ? findSingleEl(panelElement, '[data-pc-section="header"]')
            : focusOnNext
              ? findNextHeader(panelElement)
              : findPrevHeader(panelElement)

        if (header) {
            changeFocusedHeader(originalEvent, header)
        } else {
            focusOnNext ? onHeaderHomeKey(originalEvent) : onHeaderEndKey(originalEvent)
        }
    }

    function changeActiveItem(event: Event, processedItem: ProcessedItem) {
        const { item } = processedItem
        if (processedItem.isDisabled) return
        const active = isItemActive(processedItem)
        const isExpanded = !active
        const newActiveItemState = hasItem(activeItemsState, processedItem) ? null : processedItem

        if (multiple) {
            let activeItems = [...activeItemsState]

            if (hasItem(activeItems, processedItem)) {
                activeItems = activeItems.filter((activeItem) => processedItem.key !== activeItem.key)
            } else {
                activeItems.push(processedItem)
            }

            activeItemsState = activeItems
        } else {
            activeItemsState = newActiveItemState ? [newActiveItemState] : []
        }

        changeExpandedKeys(processedItem, isExpanded)

        isExpanded && event
            ? onOpen && onOpen({ originalEvent: event, item })
            : onClose && onClose({ originalEvent: event, item })
    }

    function changeExpandedKeys(item: ProcessedItem, isExpanded: boolean) {
        if (isExpanded) {
            if (expandedKeys) {
                expandedKeys = [...expandedKeys, item.key]
            }
        } else {
            if (expandedKeys) {
                expandedKeys = expandedKeys.filter((key) => key !== item.key)
            }
        }
    }

    function changeFocusedHeader(event: Event, element: HTMLElement | null | undefined) {
        element && focusEl(element)
    }

    function createMenuItemContext(processedItem: ProcessedItem): PanelMenuContext {
        const { index } = processedItem
        return {
            active: isItemActive(processedItem),
            focused: isItemFocused(processedItem),
            disabled: processedItem.isDisabled,
            index
        }
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-component', 'p-panelmenu', className],
                style,
                id: idState,
                'data-pc-name': 'panelMenu',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "panel" element
    function getPanelAttributes(processedItem: ProcessedItem) {
        const { item } = processedItem
        return resolveDivPt(
            {
                class: ['p-panelmenu-panel', item.class],
                style: item.style,
                'data-pc-section': 'panel'
            },
            pt?.panel,
            globalPt?.panel,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "header" element
    function getHeaderAttributes(processedItem: ProcessedItem) {
        const { item } = processedItem
        const { label, items, disabled } = item
        const active = isItemActive(processedItem)
        return resolveDivPt(
            {
                class: ['p-component', 'p-panelmenu-header', { 'p-highlight': active && !!items, 'p-disabled': disabled }],
                'data-pc-section': 'header',
                'aria-label': label,
                'aria-expanded': active,
                'aria-disabled': disabled,
                tabindex: disabled ? null : 0,
                onclick: (event: MouseEvent) => onItemClick(event, processedItem),
                onkeydown: (event: KeyboardEvent) => onHeaderKeyDown(event, processedItem),
                'data-p-disabled': item.disabled,
                'data-p-highlight': active,
                role: 'button'
            },
            pt?.header,
            globalPt?.header,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "headerAction" element
    function getHeaderActionAttribute(processedItem: ProcessedItem) {
        const { item } = processedItem
        return resolveAnchorPt(
            {
                class: ['p-panelmenu-header-link'],
                'data-pc-section': 'headerAction',
                tabindex: -1,
                href: item.url || '#'
            },
            pt?.headerAction,
            globalPt?.headerAction,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "headerContent" element
    function getHeaderContentAttributes(processedItem: ProcessedItem) {
        return resolveDivPt(
            {
                class: ['p-panelmenu-header-content'],
                'data-pc-section': 'headerContent'
            },
            pt?.headerContent,
            globalPt?.headerContent,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "headerLabel" element
    function getHeaderLabelAttributes(processedItem: ProcessedItem) {
        return resolveSpanPt(
            {
                class: ['p-menuitem-text'],
                'data-pc-section': 'headerLabel'
            },
            pt?.headerLabel,
            globalPt?.headerLabel,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "toggleableContent" element
    function getToggleableContentAttributes(processedItem: ProcessedItem) {
        const active = isItemActive(processedItem)
        return resolveDivPt(
            {
                class: [
                    'p-toggleable-content',
                    {
                        'p-toggleable-content-collapsed': !active
                    }
                ],
                'data-pc-section': 'toggleableContent'
            },
            pt?.toggleableContent,
            globalPt?.toggleableContent,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "menuContent" element
    function getMenuContentAttributes(processedItem: ProcessedItem) {
        return resolveDivPt(
            {
                class: ['p-panelmenu-content', 'p-menuitem-content'],
                'data-pc-section': 'menuContent'
            },
            pt?.menuContent,
            globalPt?.menuContent,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "headerIcon" element
    function getResolvedHeaderIcon(processedItem: ProcessedItem) {
        const { item } = processedItem
        const { icon } = item
        return icon
            ? resolveIconPT(
                  icon,
                  {
                      class: ['p-menuitem-icon']
                  },
                  pt?.headerIcon,
                  globalPt?.headerIcon,
                  { ...ptContext, context: createMenuItemContext(processedItem) }
              )
            : null
    }

    // "headerSubmenuIcon" element
    function getResolvedHeaderSubmenuIcon(processedItem: ProcessedItem) {
        const active = isItemActive(processedItem)
        const icon = active ? activeSubmenuIcon : submenuIcon
        return icon
            ? resolveIconPT(
                  icon,
                  {
                      class: ['p-submenu-icon']
                  },
                  pt?.headerSubmenuIcon,
                  globalPt?.headerSubmenuIcon,
                  { ...ptContext, context: createMenuItemContext(processedItem) }
              )
            : null
    }

    function getHeaderSnippetOptions(processedItem: ProcessedItem): PanelMenuItemSnippetOptions {
        const { item } = processedItem
        return {
            onclick: (event: MouseEvent) => onItemClick(event, processedItem),
            className: 'p-panelmenu-header-link',
            labelClassName: 'p-menuitem-text',
            iconClassName: `p-menuitem-icon  ${item.icon}`,
            submenuIconClassName: 'p-panelmenu-icon',
            props: _props,
            leaf: !item.items,
            active: isItemActive(processedItem)
        }
    }

    setContext<PanelMenuTreeContext>('panelMenuTree', {
        pt,
        ptContext,
        menuProps: _props,
        expandedKeys,
        submenuIcon,
        activeSubmenuIcon,
        panelMenuId: idState,
        itemSnippet
    })
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#each modelWrapper as processedItem}
        {#if processedItem.isVisible}
            <div {...getPanelAttributes(processedItem)}>
                <div {...getHeaderAttributes(processedItem)}>
                    <div {...getHeaderContentAttributes(processedItem)}>
                        {#if processedItem.item.snippet}
                            {@render processedItem.item.snippet({
                                item: processedItem.item,
                                index: processedItem.index,
                                defaultSnippet: defaultHeaderSnippet,
                                options: getHeaderSnippetOptions(processedItem)
                            })}
                        {:else if itemSnippet}
                            {@render itemSnippet({
                                item: processedItem.item,
                                index: processedItem.index,
                                defaultSnippet: defaultHeaderSnippet,
                                options: getHeaderSnippetOptions(processedItem)
                            })}
                        {:else}
                            {@render defaultHeaderSnippet({ processedItem })}
                        {/if}
                    </div>
                </div>
                {#if isItemActive(processedItem) && processedItem.items}
                    <div {...getToggleableContentAttributes(processedItem)} transition:slide>
                        <div {...getMenuContentAttributes(processedItem)}>
                            <PanelMenuList
                                panelId={processedItem.item?.id || `${idState}_${processedItem.index}`}
                                onToggle={changeExpandedKeys}
                                onHeaderFocus={updateFocusedHeader}
                                level={0}
                                modelWrapper={processedItem.items}
                                class="p-panelmenu-root-submenu"
                            />
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

{#snippet defaultHeaderSnippet({ processedItem }: { processedItem: ProcessedItem })}
    <a {...getHeaderActionAttribute(processedItem)}>
        {#if submenuIcon}<IconBuilder resolvedIcon={getResolvedHeaderSubmenuIcon(processedItem)} />{/if}
        {#if processedItem.item.icon}<IconBuilder resolvedIcon={getResolvedHeaderIcon(processedItem)} />{/if}
        {#if processedItem.item.label}<span {...getHeaderLabelAttributes(processedItem)}>{processedItem.item.label}</span>{/if}
    </a>
{/snippet}

<style>
    @layer primereact {
        .p-panelmenu .p-panelmenu-header-link {
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            position: relative;
            text-decoration: none;
        }

        .p-panelmenu .p-panelmenu-header-link:focus {
            z-index: 1;
        }

        .p-panelmenu :global(.p-submenu-list) {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .p-panelmenu :global(.p-menuitem-link) {
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            text-decoration: none;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }

        .p-panelmenu :global(.p-menuitem-text) {
            line-height: 1;
        }
    }
</style>

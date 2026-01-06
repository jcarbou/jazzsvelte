<script lang="ts">
    import { resolveAnchorPt, resolveDivPt, resolveIconPT, resolveLiPt, resolveSpanPt, resolveUlPt } from '@jazzsvelte/api'
    import type {
        PanelMenuContext,
        PanelMenuItemSnippetOptions,
        PanelMenuSubProps,
        PanelMenuTreeContext,
        ProcessedItem
    } from './panelMenu.types'
    import PanelMenuSub from './PanelMenuSub.svelte'
    import { globalPanelMenuPT as globalPt } from './panelMenu.config'
    import { getContext } from 'svelte'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { slide } from 'svelte/transition'

    let {
        panelId,
        id,
        role,
        tabIndex,
        ariaActivedescendant,
        focusedItemId,
        modelWrapper,
        activeItemPath,
        onFocus,
        onBlur,
        onKeyDown,
        onItemToggle,
        level,
        class: className,
        root
    }: PanelMenuSubProps = $props()

    const { pt, ptContext, menuProps, activeSubmenuIcon, submenuIcon } = getContext<PanelMenuTreeContext>('panelMenuTree')

    let rootEl: HTMLUListElement

    export const displayName = 'PanelMenuSub'
    export function getElement(): HTMLUListElement {
        return rootEl
    }

    function getItemId(processedItem: ProcessedItem): string {
        return `${panelId}_${processedItem.key}`
    }

    function isItemActive(processedItem: ProcessedItem): boolean {
        return (activeItemPath && activeItemPath.some((path) => path.key === processedItem.key)) || !!processedItem.item?.expanded
    }

    function isItemFocused(processedItem: ProcessedItem): boolean {
        return focusedItemId === getItemId(processedItem)
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

    function onItemClick(event: MouseEvent, processedItem: ProcessedItem) {
        const { item, index } = processedItem
        if (!item.url) {
            event.preventDefault()
        }

        item.command?.({ originalEvent: event, item, index })
        onItemToggle({ processedItem, expanded: !isItemActive(processedItem) })
    }

    function getAriaSetSize() {
        return modelWrapper.filter(({ isVisible, isSeparator }) => isVisible && !isSeparator).length
    }

    function getAriaPosInset(index: number): number {
        return index - modelWrapper.slice(0, index).filter(({ isVisible, isSeparator }) => isVisible && isSeparator).length + 1
    }

    let menuAttributes = $derived(
        resolveUlPt(
            {
                id,
                class: [
                    className,
                    {
                        'p-panelmenu-root-list': root,
                        'p-submenu-list': !root
                    }
                ],
                'data-pc-section': root ? 'menu' : 'submenu',
                tabindex: tabIndex,
                onfocus: onFocus,
                onblur: onBlur,
                onkeydown: onKeyDown,
                'aria-activedescendant': ariaActivedescendant,
                role
            },
            root ? pt?.menu : pt?.submenu,
            globalPt?.menu,
            ptContext
        )
    )

    // "separator" element
    function getSeparatorAttributes(processedItem: ProcessedItem) {
        return resolveLiPt(
            {
                id: `${id}_sep_${processedItem.index}`,
                class: ['p-menuitem-separator'],
                'data-pc-section': 'separator',
                role: 'separator'
            },
            pt?.separator,
            globalPt?.separator,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "menuitem" element
    function getMenuitemAttributes(processedItem: ProcessedItem) {
        const { item, index, isGrouped } = processedItem
        const { class: className, disabled, style } = item
        const focused = isItemFocused(processedItem)
        const active = isItemActive(processedItem)

        return resolveLiPt(
            {
                id: getItemId(processedItem),
                class: [
                    'p-menuitem',
                    className,
                    {
                        'p-focus': focused,
                        'p-disabled': disabled
                    }
                ],
                style,
                'data-pc-section': 'menuitem',
                role: 'treeitem',
                'aria-label': item.label,
                'aria-expanded': isGrouped ? active : undefined,
                'aria-level': level + 1,
                'aria-setsize': getAriaSetSize(),
                'aria-posinset': getAriaPosInset(index),
                'data-p-focused': focused,
                'data-p-disabled': disabled
            },
            pt?.menuitem,
            globalPt?.menuitem,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "separator" element
    function getContentAttributes(processedItem: ProcessedItem) {
        return resolveDivPt(
            {
                class: ['p-menuitem-content'],
                onclick: (event) => onItemClick(event, processedItem)
            },
            pt?.content,
            globalPt?.content,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "action" element
    function getActionAttributes(processedItem: ProcessedItem) {
        const { item } = processedItem
        const { disabled } = item
        return resolveAnchorPt(
            {
                href: item.url || '#',
                class: ['p-menuitem-link', { 'p-disabled': disabled }],
                'data-pc-section': 'action',
                target: item.target,
                onfocus: (event) => event.stopPropagation(),
                tabindex: -1,
                'aria-hidden': true
            },
            pt?.action,
            globalPt?.action,
            { ...ptContext, context: createMenuItemContext(processedItem) }
        )
    }

    // "SubmenuIcon" element
    function getResolvedSubmenuIcon(processedItem: ProcessedItem) {
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

    // "icon" element
    function getResolvedIcon(processedItem: ProcessedItem) {
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

    // "label" element
    function getLabelAttributes(processedItem: ProcessedItem) {
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

    function getSnippetOptions(processedItem: ProcessedItem): PanelMenuItemSnippetOptions {
        const { item } = processedItem
        return {
            onclick: (event: MouseEvent) => onItemClick(event, processedItem),
            className: 'p-menuitem-link' + (item.disabled ? 'p-disabled' : ''),
            labelClassName: 'p-menuitem-text',
            iconClassName: `p-menuitem-icon  ${item.icon}`,
            submenuIconClassName: 'p-panelmenu-icon',
            props: menuProps,
            leaf: !item.items,
            active: isItemActive(processedItem)
        }
    }
</script>

<ul bind:this={rootEl} {...menuAttributes}>
    {#each modelWrapper as processedItem}
        {#if processedItem.isSeparator}
            <li {...getSeparatorAttributes(processedItem)}></li>
        {:else}
            <li {...getMenuitemAttributes(processedItem)}>
                <div {...getContentAttributes(processedItem)}>
                    {#if processedItem.item.snippet}
                        {@render processedItem.item.snippet({
                            item: processedItem.item,
                            index: processedItem.index,
                            defaultSnippet: defaultHeaderSnippet,
                            options: getSnippetOptions(processedItem)
                        })}
                    {:else if menuProps.itemSnippet}
                        {@render menuProps.itemSnippet({
                            item: processedItem.item,
                            index: processedItem.index,
                            defaultSnippet: defaultHeaderSnippet,
                            options: getSnippetOptions(processedItem)
                        })}
                    {:else}
                        {@render defaultHeaderSnippet({ processedItem })}
                    {/if}
                </div>
                {#if isItemActive(processedItem) && processedItem.items}
                    <div {...getToggleableContentAttributes(processedItem)} transition:slide>
                        <PanelMenuSub
                            id={getItemId(processedItem) + '_list'}
                            role="group"
                            {panelId}
                            level={level + 1}
                            {focusedItemId}
                            {activeItemPath}
                            {onItemToggle}
                            modelWrapper={processedItem.items}
                            root={false}
                        />
                    </div>
                {/if}
            </li>
        {/if}
    {/each}
</ul>

{#snippet defaultHeaderSnippet({ processedItem }: { processedItem: ProcessedItem })}
    <a {...getActionAttributes(processedItem)}>
        {#if submenuIcon && processedItem.isGrouped}<IconBuilder resolvedIcon={getResolvedSubmenuIcon(processedItem)} />{/if}
        {#if processedItem.item.icon}<IconBuilder resolvedIcon={getResolvedIcon(processedItem)} />{/if}
        {#if processedItem.item.label}<span {...getLabelAttributes(processedItem)}>{processedItem.item.label}</span>{/if}
        <Ripple />
    </a>
{/snippet}

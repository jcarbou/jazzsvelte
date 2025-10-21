<script lang="ts">
    import type { TieredMenuItemProps, TieredMenuPtContext, TieredMenuTreeContext } from './tieredMenu.types'
    import type { ProcessedItem } from './tieredMenu.types'
    import type { JazzSvelteContext, HTMLAnchorAttributes, MenuItem } from '@jazzsvelte/api'

    import { getContext } from 'svelte'
    import { resolveAnchorPt, resolveDivPt, resolveIconPT, resolveLiPt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { globalTieredMenuPT as globalPt } from './tieredMenu.config'
    import { Ripple } from '@jazzsvelte/ripple'
    import TieredMenuSub from './TieredMenuSub.svelte'
    import { isSelectedItem } from './tieredMenu.utils'

    let { menuSubId, processedItem, index, model = [], menuProps, level, focusedItemId }: TieredMenuItemProps = $props()

    export const displayName = 'TieredMenuItem'

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { ripple } = jazzSvelteContext
    const {
        menuId,
        submenuIcon,
        pt,
        ptContext: parentPtContext,
        onItemClick,
        onItemMouseEnter,
        activeItemPath
    } = getContext<TieredMenuTreeContext>('tieredMenuTree')

    const item = processedItem.item
    const { style, class: itemClass, icon, url, target, disabled } = item
    //let visible = $derived(item.visible !== false)
    let key = $derived(`${menuId}_${processedItem.key}` satisfies string)
    let focused = $derived((focusedItemId === key) satisfies boolean)
    let active = $derived(isSelectedItem($activeItemPath, processedItem) satisfies boolean)
    let grouped = $derived(processedItem.isGrouped satisfies boolean)
    let ariaSetSize = $derived(
        model.filter((processedItem) => processedItem.isVisible && !processedItem.isSeparator).length satisfies number
    )
    let ariaPosInset = $derived(
        (index -
            model.slice(0, index).filter((processedItem) => processedItem.isVisible && processedItem.isSeparator).length +
            1) satisfies number
    )
    let ptContext: TieredMenuPtContext = $derived({
        ...parentPtContext,
        context: {
            active
        }
    })

    // "icon" element
    let resolvedIcon = $derived(
        resolveIconPT(
            icon || null,
            {
                class: ['p-menuitem-icon', 'p-icon'],
                'data-pc-section': 'icon'
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    // "label" element
    let labelAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-menuitem-text'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "submenuIcon" element
    let resolvedSubmenuIcon = $derived(
        resolveIconPT(
            submenuIcon,
            {
                class: ['p-submenu-icon', 'p-icon'],
                'data-pc-section': 'submenu-icon'
            },
            pt?.submenuIcon,
            globalPt?.submenuIcon,
            ptContext
        )
    )

    // "action" element
    let actionAttributes = $derived(
        resolveAnchorPt(
            {
                class: ['p-menuitem-link'],
                'data-pc-section': 'action',
                'aria-hidden': true,
                tabindex: -1,
                target: target
            },
            pt?.action,
            globalPt?.action,
            ptContext
        ) satisfies HTMLAnchorAttributes
    )

    // "content" element
    let contentAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-menuitem-content'],
                'data-pc-section': 'content',
                role: 'presentation'
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "menuitem" element
    let menuTtemAttributes = $derived(
        resolveLiPt(
            {
                class: [
                    'p-menuitem',
                    {
                        'p-menuitem-active p-highlight': active,
                        'p-focus': focused,
                        'p-disabled': disabled
                    },
                    itemClass
                ],
                'data-pc-section': 'menuitem',
                id: key,
                'aria-label': item.label,
                'aria-disabled': disabled,
                'aria-expanded': grouped ? active : undefined,
                'aria-haspopup': grouped && !url ? 'menu' : undefined,
                'aria-setsize': ariaSetSize,
                'aria-posinset': ariaPosInset,
                'data-p-highlight': active,
                'data-p-disabled': disabled,
                'data-p-visited': focused,
                style: style,
                role: 'menuitem'
            },
            pt?.menuitem,
            globalPt?.menuitem,
            ptContext
        )
    )

    function _onItemClick(event: MouseEvent, processedItem: ProcessedItem): void {
        const item = processedItem.item

        if (processedItem.isDisabled) {
            event.preventDefault()
            return
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            })
        }

        onItemClick && onItemClick({ originalEvent: event, processedItem })

        if (!item.url) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    function _onItemMouseEnter(event: MouseEvent, processedItem: ProcessedItem): void {
        onItemMouseEnter && onItemMouseEnter({ originalEvent: event, processedItem })
    }
</script>

<li {...menuTtemAttributes} onmouseenter={(event) => _onItemMouseEnter(event, processedItem)}>
    <div
        {...contentAttributes}
        role="presentation"
        onclick={(event) => _onItemClick(event, processedItem)}
        onmouseenter={(event) => _onItemMouseEnter(event, processedItem)}
    >
        {#if item.snippet}
            {@render item.snippet({ item, index, defaultSnippet })}
        {:else}
            {@render defaultSnippet({ item, index })}
        {/if}
    </div>
    {#if !!processedItem.items}
        <TieredMenuSub
            id={menuSubId + '_' + index}
            {menuProps}
            model={processedItem.items || null}
            {focusedItemId}
            aria-labelledby={key}
            level={level + 1}
            parentActive={active}
        />
    {/if}
</li>

{#snippet defaultSnippet({ item, index }: { item: MenuItem; index: number })}
    <a href={url || '#'} {...actionAttributes} onfocus={(event) => event.stopPropagation()}>
        {#if icon}<IconBuilder {resolvedIcon} />{/if}
        {#if item.label}<span {...labelAttributes}>{item.label}</span>{/if}
        {#if grouped}<IconBuilder resolvedIcon={resolvedSubmenuIcon} />{/if}
        {#if !disabled && $ripple}<Ripple />{/if}
    </a>
{/snippet}

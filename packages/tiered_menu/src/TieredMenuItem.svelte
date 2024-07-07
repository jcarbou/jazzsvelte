<script lang="ts">
    import type { TieredMenuPassThroughMethodOptions, TieredMenuProps, TieredMenuTreeContext } from './tieredMenu.types'
    import type { ProcessedItem } from './tieredMenu.types'
    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        HTMLLIAttributes,
        HTMLAnchorAttributes,
        HTMLSpanAttributes,
        ResolvedIconPT,
        PassThroughOptions
    } from '@jazzsvelte/api'

    import { getContext } from 'svelte'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { globalTieredMenuPT as globalPt } from './tieredMenu.config'
    import { Ripple } from '@jazzsvelte/ripple'
    import TieredMenuSub from './TieredMenuSub.svelte'
    import { isSelectedItem } from './tieredMenu.utils'

    export let menuSubId: string
    export let processedItem: ProcessedItem
    export let index: number
    export let model: ProcessedItem[] = []
    export let menuProps: TieredMenuProps
    export let level: number
    export let focusedItemId: string | null

    export const displayName = 'TieredMenuItem'

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { ripple } = jazzSvelteContext
    const { menuId, submenuIcon, unstyled, pt, ptOptions, onItemClick, onItemMouseEnter, activeItemPath } =
        getContext<TieredMenuTreeContext>('tieredMenuTree')

    const item = processedItem.item
    const { style, class: itemClass, icon, url, target, disabled } = item
    $: visible = item.visible !== false
    $: key = `${menuId}_${processedItem.key}` satisfies string
    $: focused = (focusedItemId === key) satisfies boolean
    $: active = isSelectedItem($activeItemPath, processedItem) satisfies boolean
    $: grouped = processedItem.isGrouped satisfies boolean
    $: ariaSetSize = model.filter((processedItem) => processedItem.isVisible && !processedItem.isSeparator)
        .length satisfies number
    $: ariaPosInset = (index -
        model.slice(0, index).filter((processedItem) => processedItem.isVisible && processedItem.isSeparator).length +
        1) satisfies number

    $: ptContext = {
        props: $$props,
        context: {
            active
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

    // "icon" element
    $: resolvedIcon = resolveIconPT(
        icon || null,
        {
            class: ['p-menuitem-icon'],
            'data-pc-section': 'icon'
        },
        pt?.icon,
        globalPt?.icon,
        ptContext
    ) satisfies ResolvedIconPT

    // "label" element
    $: labelAttributes = resolvePT(
        {
            class: ['p-menuitem-text'],
            'data-pc-section': 'label'
        },
        pt?.label,
        globalPt?.label,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "submenuIcon" element
    $: resolvedSubmenuIcon = resolveIconPT(
        submenuIcon,
        {
            class: ['p-submenu-icon'],
            'data-pc-section': 'submenu-icon'
        },
        pt?.submenuIcon,
        globalPt?.submenuIcon,
        ptContext
    ) satisfies ResolvedIconPT

    // "action" element
    $: actionAttributes = resolvePT(
        {
            class: ['p-menuitem-link'],
            'data-pc-section': 'action',
            'aria-hidden': true,
            tabIndex: '-1',
            target: target
        },
        pt?.action,
        globalPt?.action,
        ptContext
    ) satisfies HTMLAnchorAttributes

    // "content" element
    $: contentAttributes = resolvePT(
        {
            class: ['p-menuitem-content'],
            'data-pc-section': 'content',
            role: 'presentation'
        },
        pt?.content,
        globalPt?.content,
        ptContext
    ) satisfies HTMLDivAttributes

    // "menuitem" element
    $: menuTtemAttributes = resolvePT(
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
    ) satisfies HTMLLIAttributes

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

<li {...menuTtemAttributes} on:mouseenter={(event) => _onItemMouseEnter(event, processedItem)}>
    <div
        {...contentAttributes}
        role="presentation"
        on:click={(event) => _onItemClick(event, processedItem)}
        on:mouseenter={(event) => _onItemMouseEnter(event, processedItem)}
    >
        {#if item.template}
            <svelte:component this={item.template} {item} />
        {:else}
            <a href={url || '#'} {...actionAttributes} on:focus={(event) => event.stopPropagation()}>
                {#if icon}<IconBuilder {resolvedIcon} />{/if}
                {#if item.label}<span {...labelAttributes}>{item.label}</span>{/if}
                {#if grouped}<IconBuilder resolvedIcon={resolvedSubmenuIcon} />{/if}
                {#if !disabled && $ripple}<Ripple />{/if}
            </a>
        {/if}
    </div>
    {#if !!processedItem.items}
        <TieredMenuSub
            id={menuSubId + '_' + index}
            {menuProps}
            model={processedItem.items || null}
            {focusedItemId}
            ariaLabelledby={key}
            level={level + 1}
            parentActive={active}
        />
    {/if}
</li>

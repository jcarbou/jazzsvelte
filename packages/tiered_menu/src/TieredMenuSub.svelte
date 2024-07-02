<script lang="ts">
    import type { TieredMenuPassThroughMethodOptions, TieredMenuProps, TieredMenuTreeContext } from './tieredMenu.types'
    import type { ProcessedItem } from './tieredMenu.types'

    import { resolvePT, type HTMLULAttributes, type PassThroughOptions } from '@jazzsvelte/api'
    import { getContext, onMount } from 'svelte'
    import { globalTieredMenuPT as globalPt } from './tieredMenu.config'
    import {
        calculateScrollbarWidth,
        getHiddenElementOuterWidth,
        getOffsetNumbers,
        getOuterWidth,
        getViewport,
        getWindowScrollTop
    } from '@jazzsvelte/dom'
    import TieredMenuSeparator from './TieredMenuSeparator.svelte'
    import TieredMenuItem from './TieredMenuItem.svelte'

    export let focusedItemId: string | null
    export let id: string
    export let root: boolean = false
    export let parentActive: boolean = true
    export let ariaLabelledby: string = ''
    export let model: ProcessedItem[]
    export let menuProps: TieredMenuProps
    export let level: number

    export const displayName = 'TieredMenuSub'

    export function getElement(): HTMLUListElement {
        return menuEl
    }

    const { isMobileMode, unstyled, pt, ptOptions, onFocus, onBlur, onKeyDown, ariaLabel, ariaOrientation } =
        getContext<TieredMenuTreeContext>('tieredMenuTree')

    $: ptContext = {
        props: $$props,
        context: {
            active: false
        },
        state: {
            attributeSelector: '',
            visible: false
        },
        ptOptions,
        unstyled
    } satisfies TieredMenuPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    function position(): void {
        const parentItemEl = menuEl.parentElement
        if (menuEl && parentItemEl) {
            const containerOffset = getOffsetNumbers(parentItemEl)
            const viewport = getViewport()
            const sublistWidth = menuEl.offsetParent ? menuEl.offsetWidth : getHiddenElementOuterWidth(menuEl)
            const itemOuterWidth = getOuterWidth(parentItemEl.children[0] as HTMLElement)
            const top = containerOffset.top + menuEl.offsetHeight - getWindowScrollTop()

            if (top > viewport.height) {
                menuEl.style.top = viewport.height - top + 'px'
            } else {
                menuEl.style.top = '0px'
            }

            if (containerOffset.left + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
                menuEl.classList.add('p-submenu-list-flipped')
            }
        }
    }

    onMount(() => {
        if (!root && parentActive && !isMobileMode()) {
            position()
        }
    })

    // "menu" element
    $: menuAttributes = resolvePT(
        {
            class: [root ? 'p-tieredmenu-root-list' : 'p-submenu-list'],
            style: {
                display: root ? undefined! : parentActive ? 'block' : 'none'
            },
            'data-pc-section': root ? 'menubar' : 'menu',
            role: root ? 'menubar' : 'menu',
            id: id,
            tabIndex: 0,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-orientation': ariaOrientation,
            'aria-activedescendant': focusedItemId
        },
        pt?.menu,
        globalPt?.menu,
        ptContext
    ) satisfies HTMLULAttributes

    let menuEl: HTMLUListElement
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<ul bind:this={menuEl} {...menuAttributes} on:focus={onFocus} on:blur={onBlur} on:keydown={onKeyDown}>
    {#if model}
        {#each model as processedItem, index (processedItem.key)}
            {#if processedItem.isSeparator}
                <TieredMenuSeparator />
            {:else}
                <TieredMenuItem menuSubId={id} {processedItem} {index} {model} {menuProps} {level} {focusedItemId} />
            {/if}
        {/each}
    {/if}
</ul>

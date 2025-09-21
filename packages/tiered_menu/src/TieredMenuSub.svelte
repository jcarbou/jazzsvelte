<script lang="ts">
    import type { TieredMenuSubProps, TieredMenuTreeContext } from './tieredMenu.types'

    import { resolveUlPt } from '@jazzsvelte/api'
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

    let {
        focusedItemId,
        id,
        root = false,
        parentActive = true,
        ariaActiveDescendant = null,
        model,
        menuProps,
        level,
        style,
        ..._restProps
    }: TieredMenuSubProps = $props()

    /*let _props: TieredMenuSubProps = $derived({
        focusedItemId,
        id,
        root,
        parentActive,
        ariaActiveDescendant,
        model,
        menuProps,
        level,
        style
    })*/

    export const displayName = 'TieredMenuSub'

    export function getElement(): HTMLUListElement {
        return menuEl
    }
    let menuEl: HTMLUListElement

    const {
        isMobileMode, // force new line
        pt,
        ptContext,
        onFocus,
        onBlur,
        onKeyDown,
        ariaLabel,
        ariaOrientation
    } = getContext<TieredMenuTreeContext>('tieredMenuTree')

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
    let menuAttributes = $derived(
        resolveUlPt(
            {
                class: [root ? 'p-tieredmenu-root-list' : 'p-submenu-list'],
                style: [
                    style,
                    {
                        display: root ? undefined : parentActive ? 'block' : 'none'
                    }
                ],
                'data-pc-section': root ? 'menubar' : 'menu',
                role: root ? 'menubar' : 'menu',
                id: id,
                tabindex: 0,
                'aria-label': ariaLabel,
                'aria-labelledby': _restProps['aria-labelledby'],
                'aria-orientation': ariaOrientation,
                'aria-activedescendant': ariaActiveDescendant
            },
            pt?.menu,
            globalPt?.menu,
            ptContext
        )
    )
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<ul bind:this={menuEl} {...menuAttributes} {..._restProps} onfocus={onFocus} onblur={onBlur} onkeydown={onKeyDown}>
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

<script lang="ts">
    import type { TabMenuItemSnippetOptions, TabMenuProps, TabMenuPtContext } from './tabMenu.types'
    import type { MenuItem, MenuItemDefaultSnippetProps } from '@jazzsvelte/api'
    import { onKeyDownMenuItem, onMenuItemAction } from '@jazzsvelte/menu_utils'
    import { uniqueId } from '@jazzsvelte/utils'
    import { Ripple } from '@jazzsvelte/ripple'
    import { onMount } from 'svelte'
    import { resolveIconPT, resolveDivPt, resolveUlPt, resolveLiPt, resolveAnchorPt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultTabMenuProps as DEFAULT, globalTabMenuPT as globalPt } from './tabMenu.config'
    import { getAttribute, getOffsetNumbers, getWidth } from '@jazzsvelte/dom'

    let {
        children,
        activeIndex = $bindable(0),
        itemSnippet = DEFAULT.itemSnippet,
        model = DEFAULT.model,
        unstyled = DEFAULT.unstyled,
        onTabChange = null,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: TabMenuProps = $props()

    let _props: TabMenuProps = $derived({
        activeIndex,
        itemSnippet,
        model,
        pt,
        ptOptions,
        style,
        unstyled,
        onTabChange,
        class: className
    })

    export const displayName = 'TabMenu'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement
    let inkbarEl: HTMLLIElement
    let navEl: HTMLUListElement

    let idState = $state(_restProps.id ?? uniqueId('tabMenu_'))
    let ptContext: TabMenuPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        state: {
            activeIndex
        },
        ptOptions,
        unstyled
    })

    function itemClick(event: MouseEvent | KeyboardEvent, item: MenuItem, index: number) {
        const toActivate = onMenuItemAction({
            event,
            item,
            index,
            onSelect: onTabChange
        })
        if (toActivate) {
            activeIndex = index
        }
    }

    function onKeyDownItem(event: KeyboardEvent, item: MenuItem, index: number) {
        onKeyDownMenuItem({
            event,
            item,
            index,
            readOnly: false,
            checkDisabled: true
        })
    }

    function updateInkBar() {
        if (model && navEl) {
            let tabs = navEl.children
            let inkHighlighted = false

            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs[i] as HTMLElement

                if (getAttribute(tab, 'data-p-highlight')) {
                    inkbarEl.style.width = getWidth(tab) + 'px'
                    inkbarEl.style.left = getOffsetNumbers(tab).left - getOffsetNumbers(navEl).left + 'px'
                    inkHighlighted = true
                }
            }

            if (!inkHighlighted) {
                inkbarEl.style.width = '0px'
                inkbarEl.style.left = '0px'
            }
        }
    }

    onMount(() => updateInkBar())

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-component', className, 'p-tabmenu'],
                style,
                'data-pc-name': 'tabMenu',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "menu" element
    let menuAttributes = $derived(
        resolveUlPt(
            {
                class: ['p-tabmenu-nav p-reset'],
                'data-pc-section': 'menu',
                role: 'menubar',
                'aria-label': _restProps['aria-label'],
                'aria-labelledby': _restProps['aria-labelledby']
            },
            pt?.menu,
            globalPt?.menu,
            ptContext
        )
    )

    // "menuitem" element
    function getMenuItemAttributes(item: MenuItem, index: number) {
        const id = item.id || idState + '_' + index
        const active = index === (activeIndex || 0)
        const { disabled } = item

        return resolveLiPt(
            {
                class: [
                    'p-tabmenuitem',
                    {
                        'p-highlight': active,
                        'p-disabled': disabled
                    }
                ],
                'data-pc-section': 'menuitem',
                'data-p-highlight': active ? 'true' : 'false',
                'data-p-disabled': disabled ? 'true' : 'false',
                id,
                onkeydown: (event: KeyboardEvent) => onKeyDownItem(event, item, index),
                style: item.style
            },
            pt?.menuitem,
            globalPt?.menuitem,
            {
                ...ptContext,
                context: {
                    index
                }
            }
        )
    }

    // "action" element
    function getActionAttributes(item: MenuItem, index: number) {
        const { label, target } = item
        const active = index === (activeIndex || 0)

        return resolveAnchorPt(
            {
                class: ['p-menuitem-link'],
                'data-pc-section': 'action',
                role: 'menuitem',
                'aria-label': label,
                tabindex: active ? 0 : -1,
                target: target,
                onclick: (event) => itemClick(event, item, index)
            },
            pt?.action,
            globalPt?.action,
            {
                ...ptContext,
                context: {
                    index
                }
            }
        )
    }

    // "label" element
    function getLabelAttributes() {
        return resolveSpanPt(
            {
                class: ['p-menuitem-text'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    }

    // "inkbar" element
    let inkbarAttributes = $derived(
        resolveLiPt(
            {
                class: ['p-tabmenu-ink-bar'],
                'data-pc-section': 'inkbar',
                role: 'none'
            },
            pt?.inkbar,
            globalPt?.inkbar,
            ptContext
        )
    )

    // "icon" element
    function getResolvedItemIcon(item: MenuItem) {
        return resolveIconPT(
            item.icon || null,
            {
                class: ['p-menuitem-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    }

    function getSnippetOptions(item: MenuItem, index: number): TabMenuItemSnippetOptions {
        const { disabled, icon } = item
        const active = index === (activeIndex || 0)
        return {
            onclick: (event: MouseEvent) => itemClick(event, item, index),
            class: 'p-menuitem-link',
            labelClass: 'p-menuitem-text',
            iconClass: icon ? 'p-menuitem-icon' : '',
            props: _props,
            active,
            index,
            disabled
        }
    }
</script>

{#if model}
    <div bind:this={rootEl} {...rootAttributes} {..._restProps}>
        <ul bind:this={navEl} {...menuAttributes}>
            {#each model as item, index}
                {#if item.visible !== false}
                    <li {...getMenuItemAttributes(item, index)}>
                        {#if item.snippet}
                            {@render item.snippet({
                                item,
                                index,
                                options: getSnippetOptions(item, index),
                                defaultSnippet: defaultContentSnippet
                            })}
                        {:else if itemSnippet}
                            {@render itemSnippet({
                                item,
                                index,
                                options: getSnippetOptions(item, index),
                                defaultSnippet: defaultContentSnippet
                            })}
                        {:else}
                            {@render defaultContentSnippet({ item, index })}
                        {/if}
                    </li>
                {/if}
            {/each}
            <li bind:this={inkbarEl} {...inkbarAttributes}></li>
        </ul>
    </div>
{/if}

{#snippet defaultContentSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <a {...getActionAttributes(item, index)}>
        {#if item.icon}
            <IconBuilder resolvedIcon={getResolvedItemIcon(item)} />
        {/if}
        {#if item.label}
            <span {...getLabelAttributes()}>{item.label}</span>
        {/if}
        <Ripple />
    </a>
{/snippet}

<style>
    @layer primereact {
        .p-tabmenu {
            overflow-x: auto;
        }

        .p-tabmenu-nav {
            display: flex;
            margin: 0;
            padding: 0;
            list-style-type: none;
            flex-wrap: nowrap;
        }

        .p-tabmenu-nav a {
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            position: relative;
            text-decoration: none;
            text-decoration: none;
            overflow: hidden;
        }

        .p-tabmenu-nav a:focus {
            z-index: 1;
        }

        .p-tabmenu-nav .p-menuitem-text {
            line-height: 1;
        }

        .p-tabmenu-ink-bar {
            display: none;
            z-index: 1;
        }

        .p-tabmenu::-webkit-scrollbar {
            display: none;
        }
    }
</style>

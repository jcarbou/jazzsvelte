<script lang="ts">
    import type { StepMenuItemSnippetOptions, StepsProps, StepsPtContext } from './steps.types'
    import { onKeyDownMenuItem, onMenuItemAction, setFocusToFirstMenuItem } from '@jazzsvelte/menu_utils'
    import { Ripple } from '@jazzsvelte/ripple'
    import {
        resolveIconPT,
        resolveUlPt,
        resolveLiPt,
        resolveAnchorPt,
        resolveSpanPt,
        type MenuItem,
        resolveNavPt,
        type MenuItemSnippetProps
    } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultStepsProps as DEFAULT, globalStepsPT as globalPt } from './steps.config'

    let {
        children,
        activeIndex = $bindable(0),
        itemSnippet = DEFAULT.itemSnippet,
        model = DEFAULT.model,
        readOnly = DEFAULT.readOnly,
        unstyled = DEFAULT.unstyled,
        onSelect = null,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: StepsProps = $props()

    let _props: StepsProps = $derived({
        activeIndex,
        itemSnippet,
        model,
        pt,
        ptOptions,
        readOnly,
        style,
        unstyled,
        onSelect,
        class: className
    })

    export const displayName = 'Steps'
    export function getElement(): HTMLElement {
        return rootEl
    }
    export function getMenuElement(): HTMLUListElement {
        return menuEl
    }

    let rootEl: HTMLElement
    let menuEl: HTMLUListElement

    let ptContext: StepsPtContext = $derived({
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
            onSelect,
            readOnly
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
            readOnly,
            checkDisabled: false
        })
    }

    function setFocusToFirstItem() {
        setFocusToFirstMenuItem(menuEl)
    }

    // "root element"
    let rootAttributes = $derived(
        resolveNavPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-steps',
                    {
                        'p-readonly': readOnly
                    }
                ],
                style,
                'data-pc-name': 'steps',
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
                class: [],
                'data-pc-section': 'menu',
                tabindex: readOnly ? null : 0,
                onfocus: () => {
                    if (!readOnly) {
                        setFocusToFirstItem()
                    }
                },
                onblur: () => setFocusToFirstItem
            },
            pt?.menu,
            globalPt?.menu,
            ptContext
        )
    )

    // "action" element
    function getActionAttributes(item: MenuItem, index: number) {
        return resolveAnchorPt(
            {
                class: ['p-menuitem-link'],
                'data-pc-section': 'action',
                href: item.url || '#',
                tabindex: -1,
                onfocus: (event) => event.stopPropagation(),
                target: item.target,
                onkeydown: (event) => onKeyDownItem(event, item, index),
                onclick: (event) => itemClick(event, item, index)
            },
            pt?.action,
            globalPt?.action,
            ptContext
        )
    }

    // "step" element
    let stepAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-steps-number'],
                'data-pc-section': 'step'
            },
            pt?.step,
            globalPt?.step,
            ptContext
        )
    )

    // "label" element
    function getLabelAttributes() {
        return resolveSpanPt(
            {
                class: ['p-steps-title'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    }

    // "action" element
    function getMenuItemAttributes(item: MenuItem, index: number) {
        const disabled = item.disabled || (index !== activeIndex && readOnly)
        const active = index === (activeIndex || 0)

        return resolveLiPt(
            {
                class: [
                    'p-steps-item',
                    item.class,
                    {
                        'p-highlight p-steps-current': active,
                        'p-disabled': disabled
                    }
                ],
                'data-pc-section': 'menuitem',
                style: item.style
            },
            pt?.menuitem,
            globalPt?.menuitem,
            ptContext
        )
    }

    // "icon" element
    function getResolvedItemIcon(item: MenuItem) {
        resolveIconPT(
            item.icon || null,
            {
                class: ['p-menuitem-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    }

    function getSnippetOptions(item: MenuItem, index: number): StepMenuItemSnippetOptions {
        const disabled = item.disabled || (index !== activeIndex && readOnly)
        const active = index === (activeIndex || 0)

        return {
            onClick: (event: MouseEvent) => itemClick(event, item, index),
            className: 'p-menuitem-link',
            labelClassName: 'p-steps-title',
            numberClassName: 'p-steps-number',
            iconClassName: item.icon as string,
            'aria-current': active,
            props: _props,
            active,
            disabled
        }
    }
</script>

<nav bind:this={rootEl} {...rootAttributes} {..._restProps}>
    <ol bind:this={menuEl} {...menuAttributes}>
        {#if model}
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
        {/if}
    </ol>
</nav>

{#snippet defaultContentSnippet({ item, index }: MenuItemSnippetProps)}
    <a {...getActionAttributes(item, index)}>
        <span {...stepAttributes}>{index + 1}</span>
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
        .p-steps {
            position: relative;
        }

        .p-steps ol {
            padding: 0;
            margin: 0;
            list-style-type: none;
            display: flex;
        }

        .p-steps-item {
            position: relative;
            display: flex;
            justify-content: center;
            flex: 1 1 auto;
        }

        .p-steps-item .p-menuitem-link {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            text-decoration: none;
        }

        .p-steps.p-readonly .p-steps-item {
            cursor: auto;
        }

        .p-steps-item.p-steps-current .p-menuitem-link {
            cursor: default;
        }

        .p-steps-title {
            white-space: nowrap;
        }

        .p-steps-number {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .p-steps-title {
            display: block;
        }
    }
</style>

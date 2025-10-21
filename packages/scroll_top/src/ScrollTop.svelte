<script lang="ts">
    import type { ScrollTopProps, ScrollTopPtContext } from './scrollTop.types'
    import type { JazzSvelteContext } from '@jazzsvelte/api'
    import { parentEvents } from '@jazzsvelte/parent_events_action'
    import { onMountWindowEvents } from '@jazzsvelte/window_events_action'
    import { getWindowScrollTop } from '@jazzsvelte/dom'
    import { getContext, onMount } from 'svelte'
    import { resolveIconPT, resolveButtonPt, localeOption } from '@jazzsvelte/api'
    import { zIndex } from '@jazzsvelte/z_index_action'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { defaultScrollTopProps as DEFAULT, globalScrollTopPT as globalPt } from './scrollTop.config'

    let {
        // children,
        behavior = DEFAULT.behavior,
        icon = DEFAULT.icon,
        target = DEFAULT.target,
        threshold = DEFAULT.threshold,
        transition = DEFAULT.transition,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        onShow = null,
        onHide = null,
        ..._restProps
    }: ScrollTopProps = $props()

    let _props: ScrollTopProps = $derived({
        behavior,
        className,
        icon,
        pt,
        ptOptions,
        style,
        target,
        threshold,
        transition,
        unstyled,
        class: className,
        onShow,
        onHide
    })

    export const displayName = 'ScrollTop'
    export function getElement(): HTMLButtonElement {
        return rootEl
    }

    let rootEl: HTMLButtonElement
    let helperEl: HTMLSpanElement

    let visible: boolean = $state(false)

    let ptContext: ScrollTopPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        state: {
            visible
        },
        ptOptions,
        unstyled
    })
    let isTargetParent = $derived(target === 'parent')

    // "root element"
    let rootAttributes = $derived(
        resolveButtonPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-scrolltop p-link p-component',
                    {
                        'p-scrolltop-sticky': target !== 'window'
                    }
                ],
                style,
                'data-pc-name': 'scrollTop',
                'data-pc-section': 'root',
                'aria-label': localeOption('aria') ? localeOption('aria').scrollTop : undefined
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "icon" element
    let resolvedIcon = $derived(
        resolveIconPT(
            icon,
            {
                class: ['p-scrolltop-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    function checkVisibility(scrollY: number) {
        visible = scrollY > threshold
    }

    function checkVisibilityByWindowEvent(event: Event) {
        !isTargetParent && event && checkVisibility(getWindowScrollTop())
    }

    function onClick() {
        const scrollElement = isTargetParent ? helperEl.parentElement : window

        if (scrollElement) {
            scrollElement.scroll({
                top: 0,
                behavior
            })
        }
    }

    onMount(() => {
        return onMountWindowEvents({ scroll: (event) => checkVisibilityByWindowEvent(event) })
    })

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

{#if visible}
    <button
        bind:this={rootEl}
        {...rootAttributes}
        {..._restProps}
        onclick={onClick}
        transition:transition
        onintroend={() => onShow && onShow()}
        onoutroend={() => onHide && onHide()}
        use:zIndex={{ key: 'overlay', jazzSvelteContext }}
    >
        <IconBuilder {resolvedIcon} />
        <Ripple />
    </button>
{/if}

{#if isTargetParent}
    <span
        bind:this={helperEl}
        class="p-scrolltop-helper"
        use:parentEvents={{ scroll: ({ parentElement }) => checkVisibility(parentElement.scrollTop) }}
    ></span>
{/if}

<style>
    @layer primereact {
        .p-scrolltop {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .p-scrolltop-sticky {
            position: sticky;
        }

        .p-scrolltop-sticky.p-link {
            margin-left: auto;
        }

        .p-scrolltop-helper {
            display: none;
        }

        .p-scrolltop-enter {
            opacity: 0;
        }

        .p-scrolltop-enter-active {
            opacity: 1;
            transition: opacity 0.15s;
        }

        .p-scrolltop-exit {
            opacity: 1;
        }

        .p-scrolltop-exit-active {
            opacity: 0;
            transition: opacity 0.15s;
        }
    }
</style>

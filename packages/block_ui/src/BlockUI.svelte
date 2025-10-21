<script lang="ts">
    import type { BlockUIProps, BlockUIPtContext } from './blockUI.types'
    import type { JazzSvelteContext } from '@jazzsvelte/api'
    import { zIndex } from '@jazzsvelte/api'
    import { getContext, onMount } from 'svelte'
    import { resolveDivPt, isUnstyled } from '@jazzsvelte/api'
    import { onMountElement } from '@jazzsvelte/mount_action'
    import { portal } from '@jazzsvelte/portal_action'
    import { defaultBlockUIProps as DEFAULT, globalBlockUIPT as globalPt } from './blockUI.config'
    import { addClass, blockBodyScroll, hasCSSAnimation, unblockBodyScroll } from '@jazzsvelte/dom'

    let {
        children,
        autoZIndex = DEFAULT.autoZIndex,
        baseZIndex = DEFAULT.baseZIndex,
        blocked = DEFAULT.blocked,
        containerClass = DEFAULT.containerClass,
        containerStyle = DEFAULT.containerStyle,
        fullScreen = DEFAULT.fullScreen,
        snippet = null,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        onBlocked = null,
        onUnblocked = null,
        ..._restProps
    }: BlockUIProps = $props()

    let _props: BlockUIProps = $derived({
        autoZIndex,
        baseZIndex,
        blocked,
        containerClass,
        containerStyle,
        fullScreen,
        pt,
        ptOptions,
        style,
        snippet,
        unstyled,
        class: className,
        onBlocked,
        onUnblocked
    })

    export const displayName = 'BlockUI'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement
    let maskEl: HTMLDivElement
    let activeElement: HTMLElement | null = null

    let visibleState = $state(false)

    let zIndexKey = $derived(fullScreen ? 'modal' : 'overlay')
    let appendTo = $derived(fullScreen ? 'body' : 'self')

    let ptContext: BlockUIPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        state: {
            blocked: false
        },
        ptOptions,
        unstyled
    })

    function block() {
        visibleState = true
        activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    }

    function unblock() {
        !isUnstyled(_props) && addClass(maskEl, 'p-component-overlay-leave')

        if (hasCSSAnimation(maskEl)) {
            maskEl.addEventListener('animationend', () => {
                removeMask()
            })
        } else {
            removeMask()
        }
    }

    function onMountMask() {
        if (fullScreen) {
            blockBodyScroll()
            activeElement && activeElement.blur()
        }

        onBlocked && onBlocked()
    }

    onMount(() => {
        visibleState && block()
        return () => {
            fullScreen && unblockBodyScroll()
        }
    })

    $effect(() => {
        blocked ? block() : unblock()
    })

    const removeMask = () => {
        visibleState = false

        if (fullScreen) {
            unblockBodyScroll()
            activeElement?.focus()
        }

        onUnblocked && onUnblocked()
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-component', containerClass, 'p-blockui-container'],
                style: containerStyle,
                'data-pc-name': 'blockUI',
                'data-pc-section': 'root',
                'aria-busy': blocked
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "mask" element
    let maskAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    className,
                    'p-blockui p-component-overlay p-component-overlay-enter',
                    {
                        'p-blockui-document': fullScreen
                    }
                ],
                style: [
                    style,
                    { position: fullScreen ? 'fixed' : 'absolute', top: '0', left: '0', width: '100%', height: '100%' }
                ],
                'data-pc-section': 'mask'
            },
            pt?.mask,
            globalPt?.mask,
            ptContext
        )
    )

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if children}
        {@render children()}
    {/if}
    {#if visibleState}
        <div
            bind:this={maskEl}
            {...maskAttributes}
            use:zIndex={{ key: zIndexKey, jazzSvelteContext, autoZIndex, baseZIndex }}
            use:onMountElement={onMountMask}
            use:portal={appendTo}
        >
            {#if snippet}
                {@render snippet()}
            {/if}
        </div>
    {/if}
</div>

<style>
    @layer primereact {
        .p-blockui-container {
            position: relative;
        }

        .p-blockui {
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .p-blockui.p-component-overlay {
            position: absolute;
        }

        .p-blockui-document.p-component-overlay {
            position: fixed;
        }
    }
</style>

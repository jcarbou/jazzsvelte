<script lang="ts">
    import type { InplaceProps, InplacePtContext } from './inplace.types'
    import { defaultInplaceProps as DEFAULT, globalInplacePT as globalPt } from './inplace.config'
    import { Button, type ButtonProps } from '@jazzsvelte/button'
    import { localeOption, resolveDivPt } from '@jazzsvelte/api'

    let {
        children,
        active = DEFAULT.active,
        ariaLabel = DEFAULT.ariaLabel,
        closable = DEFAULT.closable,
        closeIcon = DEFAULT.closeIcon,
        contentSnippet,
        displaySnippet,
        disabled = DEFAULT.disabled,
        onClose = null,
        onOpen = null,
        onToggle = null,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,

        ..._restProps
    }: InplaceProps = $props()

    let _props: InplaceProps = $derived({
        active,
        ariaLabel,
        closable,
        closeIcon,
        contentSnippet,
        displaySnippet,
        disabled,
        onClose,
        onOpen,
        onToggle,
        pt,
        ptOptions,
        style,
        unstyled,
        class: className
    })

    export const displayName = 'Inplace'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let _activeState = $state(active)
    let _active = $derived(onToggle ? active : _activeState)

    let ptContext: InplacePtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        state: {
            active: _activeState
        },
        ptOptions,
        unstyled
    })

    function open(event: MouseEvent | KeyboardEvent) {
        if (disabled) {
            return
        }

        onOpen && onOpen(event)

        if (onToggle) {
            onToggle({
                originalEvent: event,
                value: true
            })
        } else {
            _activeState = true
        }
    }

    function close(event?: MouseEvent) {
        if (disabled) {
            return
        }

        onClose && onClose(event)

        if (onToggle) {
            onToggle({
                originalEvent: event,
                value: false
            })
        } else {
            _activeState = false
        }
    }

    function onDisplayKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
            open(event)
            event.preventDefault()
        }
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-inplacet',
                    {
                        'p-inplace-closable': closable
                    }
                ],
                style,
                'data-pc-name': 'inplace',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "display" element
    let displayAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-inplace-display',
                    {
                        'p-disabled': disabled
                    }
                ],
                'data-pc-section': 'display',
                onclick: open,
                onkeydown: onDisplayKeyDown,
                tabindex: _restProps.tabindex ?? 0,
                role: 'button',
                'aria-label': ariaLabel
            },
            pt?.display,
            globalPt?.display,
            ptContext
        )
    )

    // "content" element
    let contentAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-inplace-content'],
                'data-pc-section': 'content'
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "closeButton" element
    let closeButtonAttributes: ButtonProps = $derived({
        class: 'p-inplace-content-close',
        'data-pc-section': 'closeButton',
        icon: closeIcon,
        type: 'button',
        onclick: close,
        'aria-label': localeOption('aria')?.close ?? undefined
        //pt: pt?.closeButton
        // globalPt?.closeButton,
        //ptContext
    })
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if _active}
        <div {...contentAttributes}>
            {@render contentSnippet()}
            {#if closable}
                <Button {...closeButtonAttributes}></Button>
            {/if}
        </div>
    {:else}
        <div {...displayAttributes}>
            {@render displaySnippet()}
        </div>
    {/if}
</div>

<style>
    @layer primereact {
        .p-inplace .p-inplace-display {
            display: inline;
            cursor: pointer;
        }

        .p-inplace .p-inplace-content {
            display: inline;
        }

        .p-fluid .p-inplace.p-inplace-closable .p-inplace-content {
            display: flex;
        }

        .p-fluid .p-inplace.p-inplace-closable .p-inplace-content > .p-inputtext {
            flex: 1 1 auto;
            width: 1%;
        }

        .p-inplace-content-close {
            margin-left: 0.25rem;
        }
    }
</style>

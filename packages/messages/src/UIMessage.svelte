<script lang="ts">
    import type { MessagesMessageSeverity, UIMessageProps, UIMessagePtContext } from './messages.types'
    import { InfoCircleIcon } from '@jazzsvelte/infocircle_icon'
    import { ExclamationTriangleIcon } from '@jazzsvelte/exclamationtriangle_icon'
    import { TimesCircleIcon } from '@jazzsvelte/timescircle_icon'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import { TimesIcon } from '@jazzsvelte/times_icon'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { resolveIconPT, resolveDivPt, resolveSpanPt, resolveButtonPt } from '@jazzsvelte/api'
    import { defaultMessagesProps as DEFAULT, globalMessagesPT as globalPt } from './messages.config'
    import { onMount } from 'svelte'

    let { messageState, transition, onClick, onClose, pt = null, ptOptions = null, unstyled = false }: UIMessageProps = $props()

    let _props: UIMessageProps = $derived({
        messageState,
        transition,
        onClick,
        onClose,
        pt,
        ptOptions,
        unstyled
    })

    export const displayName = 'UIMessage'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let timeoutId: number | null = $state(null)

    let severity: MessagesMessageSeverity = $derived(messageState.message.severity ?? 'info')
    let { icon, closable, closeIcon, content, detail, summary, sticky, life, contentSnippet } = $derived(messageState.message)

    onMount(() => {
        if (sticky) return
        timeoutId = setTimeout(onClose, life ?? 3000)
    })

    function _onClose(event: Event) {
        timeoutId && clearTimeout(timeoutId)
        onClose(messageState)

        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    function _onClick() {
        onClick && onClick(messageState)
    }

    let ptContext: UIMessagePtContext = $derived({
        props: { ...DEFAULT, ..._props },
        context: {},
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    'p-message',
                    {
                        [`p-message-${severity}`]: severity
                    }
                ],
                'data-pc-name': 'messages',
                'data-pc-section': 'root',
                role: 'alert',
                'aria-live': 'assertive',
                'aria-atomic': 'true',
                onclick: _onClick
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "wrapper" element
    let wrapperAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-message-wrapper'],
                'data-pc-section': 'wrapper'
            },
            pt?.wrapper,
            globalPt?.wrapper,
            ptContext
        )
    )

    // "summary" element
    let summaryAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-message-summary'],
                'data-pc-section': 'summary'
            },
            pt?.summary,
            globalPt?.summary,
            ptContext
        )
    )

    // "detail" element
    let detailAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-message-detail'],
                'data-pc-section': 'detail'
            },
            pt?.detail,
            globalPt?.detail,
            ptContext
        )
    )

    // "button" element
    let buttonAttributes = $derived(
        resolveButtonPt(
            {
                class: ['p-message-close p-link'],
                'data-pc-section': 'button',
                onclick: _onClose
            },
            pt?.button,
            globalPt?.button,
            ptContext
        )
    )

    // "icon" element
    let _icon = $derived.by(() => {
        if (icon) return icon
        switch (severity) {
            case 'info':
                return InfoCircleIcon
            case 'warn':
                return ExclamationTriangleIcon
            case 'error':
                return TimesCircleIcon
            case 'success':
                return CheckIcon
            default:
                return null
        }
    })
    let resolvedIcon = $derived(
        resolveIconPT(
            _icon,
            {
                class: ['p-message-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    // "buttonIcon" element
    let buttonIcon = $derived(closeIcon ?? TimesIcon)
    let resolvedButtonIcon = $derived(
        resolveIconPT(
            buttonIcon,
            {
                class: ['p-message-close-icon']
            },
            pt?.buttonIcon,
            globalPt?.buttonIcon,
            ptContext
        )
    )

    let _contentSnippet = $derived(contentSnippet ?? defaultContentSnippet)
</script>

<div transition:transition bind:this={rootEl} {...rootAttributes}>
    <div {...wrapperAttributes}>
        {#if messageState}
            {#if content}
                {content}{:else}
                {@render _contentSnippet({ messageState })}
            {/if}
        {/if}
        {#if closable}
            <button {...buttonAttributes}>
                <IconBuilder resolvedIcon={resolvedButtonIcon} />
                <Ripple />
            </button>
        {/if}
    </div>
</div>

{#snippet defaultContentSnippet()}
    <IconBuilder {resolvedIcon} />
    <span {...summaryAttributes}>{summary}</span>
    <span {...detailAttributes}>{detail}</span>
{/snippet}

<style>
    @layer primereact {
        .p-message-wrapper {
            display: flex;
            align-items: center;
        }

        .p-message-icon {
            flex-shrink: 0;
        }

        .p-message-close {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .p-message-close.p-link {
            margin-left: auto;
            overflow: hidden;
            position: relative;
        }

        .p-message-enter {
            opacity: 0;
        }

        .p-message-enter-active {
            opacity: 1;
            transition: opacity 0.3s;
        }

        .p-message-exit {
            opacity: 1;
            max-height: 1000px;
        }

        .p-message-exit-active {
            opacity: 0;
            max-height: 0;
            margin: 0;
            overflow: hidden;
            transition:
                max-height 0.3s cubic-bezier(0, 1, 0, 1),
                opacity 0.3s,
                margin 0.3s;
        }

        .p-message-exit-active .p-message-close {
            display: none;
        }
    }
</style>

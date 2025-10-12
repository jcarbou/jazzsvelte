<script lang="ts">
    import type { MessageProps, MessagePtContext } from './message.types'
    import { InfoCircleIcon } from '@jazzsvelte/infocircle_icon'
    import { ExclamationTriangleIcon } from '@jazzsvelte/exclamationtriangle_icon'
    import { TimesCircleIcon } from '@jazzsvelte/timescircle_icon'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import { resolveIconPT, resolveDivPt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultMessageProps as DEFAULT, globalMessagePT as globalPt } from './message.config'

    let {
        children,
        content = DEFAULT.content,
        contentSnippet = null,
        icon = DEFAULT.icon,
        severity = DEFAULT.severity,
        text = DEFAULT.text,
        textSnippet = null,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: MessageProps = $props()

    let _props: MessageProps = $derived({
        content,
        contentSnippet,
        icon,
        pt,
        ptOptions,
        severity,
        style,
        text,
        textSnippet,
        unstyled,
        class: className
    })

    export const displayName = 'Message'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let ptContext: MessagePtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
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
                    className,
                    'p-inline-message p-component',
                    {
                        [`p-inline-message-${severity}`]: severity
                    }
                ],
                style,
                role: 'alert',
                'aria-live': 'polite',
                'aria-atomic': 'true',
                'data-pc-name': 'message',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "text" element
    let textAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-inline-message-text'],
                'data-pc-section': 'text'
            },
            pt?.text,
            globalPt?.text,
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
                class: ['p-inline-message-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    let _contentSnippet = $derived(contentSnippet ?? defaultContent)
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if content}
        {content}
    {:else}
        {@render _contentSnippet({ props: _props })}
    {/if}
</div>

{#snippet defaultContent()}
    <IconBuilder {resolvedIcon} />
    <span {...textAttributes}>
        {#if textSnippet}
            {@render textSnippet()}
        {:else}
            {text}
        {/if}
    </span>
{/snippet}

<style>
    @layer primereact {
        .p-inline-message {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: top;
        }

        .p-inline-message-icon {
            flex-shrink: 0;
        }

        .p-inline-message-icon-only .p-inline-message-text {
            visibility: hidden;
            width: 0;
        }

        .p-fluid .p-inline-message {
            display: flex;
        }
    }
</style>

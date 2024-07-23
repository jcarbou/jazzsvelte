<script lang="ts">
    import type {
        HTMLButtonAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        HTMLDivAttributes,
        PassThroughOptions,
        HTMLSpanAttributes
    } from '@jazzsvelte/api'

    import type {
        ToastMessageStatus,
        ToastSeverity,
        ToastMessagePassThroughOptions,
        ToastMessagePassThroughMethodOptions
    } from './toastMessage.types'

    import { defaultToastMessageProps as DEFAULT, globalToastMessagePT as globalPt } from './toastMessage.config'
    import { SvelteComponent, type ComponentType } from 'svelte'
    import { resolveIconPT, resolvePT, localeOption } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { ripple } from '@jazzsvelte/ripple'
    import { InfoCircleIcon } from '@jazzsvelte/infocircle_icon'
    import { ExclamationTriangleIcon } from '@jazzsvelte/exclamationtriangle_icon'
    import { TimesCircleIcon } from '@jazzsvelte/timescircle_icon'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import { closeToast } from './toast.store'

    export let id: string
    export let timerId: ReturnType<typeof setTimeout> | null = null
    export let status: ToastMessageStatus

    export { className as class }
    let className: string | null = DEFAULT.class
    export let ariaCloseLabel: string | null = DEFAULT.ariaCloseLabel || null
    export let closable: boolean = DEFAULT.closable
    export let closeIcon: string | IconComponent | null = DEFAULT.closeIcon
    export let contentClass: string | null = DEFAULT.contentClass
    export let contentStyle: CssStyle | null = DEFAULT.contentStyle
    export let customContent: typeof SvelteComponent | null = DEFAULT.customContent
    export let customProps: Record<string, any> | null = DEFAULT.customProps
    export let detail: string | null = DEFAULT.detail
    export let icon: string | IconComponent | null = DEFAULT.icon
    export let onClose: ((status: ToastMessageStatus) => void) | null = DEFAULT.onClose
    export let onClick: ((status: ToastMessageStatus) => void) | null = DEFAULT.onClick
    export let pt: Omit<ToastMessagePassThroughOptions, 'message'> | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let severity: ToastSeverity | null = DEFAULT.severity
    export let sticky: boolean = DEFAULT.sticky
    export let style: CssStyle = DEFAULT.style
    export let summary: string | null = DEFAULT.summary
    export let unstyled: boolean = DEFAULT.unstyled

    export const displayName = 'ToastMessage'

    const icons: { [key: string]: ComponentType } = {
        info: InfoCircleIcon,
        warn: ExclamationTriangleIcon,
        error: TimesCircleIcon,
        success: CheckIcon
    }

    $: _icon = icon || (severity && icons[severity]) || (null satisfies string | IconComponent | null)

    $: ptContext = {
        props: $$props,
        ptOptions,
        unstyled
    } satisfies ToastMessagePassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
    // "icon" element
    $: resolvedIcon = resolveIconPT(
        _icon,
        { class: ['p-toast-message-icon'] },
        pt?.icon,
        globalPt?.icon,
        ptContext
    ) satisfies ResolvedIconPT

    // "close button" element
    $: closeButtonAttributes = resolvePT(
        {
            class: ['p-toast-icon-close', 'p-link'],
            'aria-label': ariaCloseLabel || localeOption('close')
        },
        pt?.closeButton,
        globalPt?.closeButton,
        ptContext
    ) satisfies HTMLButtonAttributes

    // "closeButton" element
    $: resolvedCloseIcon = resolveIconPT(
        closeIcon,
        { class: ['p-toast-icon-close-icon'] },
        pt?.closeButtonIcon,
        globalPt?.closeButtonIcon,
        ptContext
    ) satisfies ResolvedIconPT

    // "content" element
    $: contentAttributes = resolvePT(
        {
            class: ['p-toast-message-content', contentClass],
            style: contentStyle
        },
        pt?.content,
        globalPt?.content,
        ptContext
    ) satisfies HTMLDivAttributes

    // "message" element
    $: messageAttributes = resolvePT(
        {
            class: [
                className,
                'p-toast-message',
                {
                    [`p-toast-message-${severity}`]: !!severity
                }
            ],
            style,
            role: 'alert',
            'aria-live': 'assertive',
            'aria-atomic': 'true'
        },
        pt?.root,
        globalPt?.message,
        ptContext
    ) satisfies HTMLDivAttributes

    // "text" element
    $: textAttributes = resolvePT(
        { class: ['p-toast-message-text'] },
        pt?.text,
        globalPt?.text,
        ptContext
    ) satisfies HTMLDivAttributes

    // "summary" element
    $: summaryAttributes = resolvePT(
        { class: ['p-toast-summary'] },
        pt?.summary,
        globalPt?.summary,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "summary" element
    $: detailAttributes = resolvePT(
        { class: ['p-toast-detail'] },
        pt?.detail,
        globalPt?.detail,
        ptContext
    ) satisfies HTMLDivAttributes

    function _onMouseEnter(event: MouseEvent) {
        // do not continue if the user has canceled the event
        if (event.defaultPrevented) return

        // stop timer while user has focused message
        !sticky && timerId !== null && clearTimeout(timerId)
    }

    function _onClick() {
        onClick?.(status)
    }

    $: _onClose = () => {
        closeToast(status)
        onClose?.(status)
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={_onMouseEnter} on:click={_onClick} {...messageAttributes}>
    <div {...contentAttributes}>
        {#if customContent}
            <svelte:component this={customContent} {...$$props} {...customProps} />
        {:else}
            {#if _icon}
                <IconBuilder {resolvedIcon} />
            {/if}
            <div {...textAttributes}>
                <span {...summaryAttributes}>{summary}</span>
                {#if detail}
                    <div {...detailAttributes}>{detail}</div>
                {/if}
            </div>
        {/if}
        {#if closable}
            <div>
                <button type="button" {...closeButtonAttributes} on:click|preventDefault={_onClose} use:ripple>
                    <IconBuilder resolvedIcon={resolvedCloseIcon} />
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    @layer primereact {
        /*.p-toast {
        width: calc(100% - var(--toast-indent, 0px));
        max-width: 25rem;
    }

    .p-toast-top-center {
        transform: translateX(-50%);
    }
    
    .p-toast-bottom-center {
        transform: translateX(-50%);
    }
    
    .p-toast-center {
        min-width: 20vw;
        transform: translate(-50%, -50%);
    }
    
    */
        .p-toast-message-icon {
            flex-shrink: 0;
        }

        .p-toast-message-content {
            display: flex;
            align-items: flex-start;
        }

        .p-toast-message-text {
            flex: 1 1 auto;
        }

        .p-toast-summary {
            overflow-wrap: anywhere;
        }

        .p-toast-detail {
            overflow-wrap: anywhere;
        }

        .p-toast-icon-close {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        .p-toast-icon-close.p-link {
            cursor: pointer;
        }

        /* Animations */
        /*.p-toast-message-enter {
        opacity: 0;
        transform: translateY(50%);
    }
    
    .p-toast-message-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .p-toast-message-enter-done {
        transform: none;
    }
    
    .p-toast-message-exit {
        opacity: 1;
        max-height: 1000px;
    }
    
    .p-toast .p-toast-message.p-toast-message-exit-active {
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        overflow: hidden;
        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
    }*/
    }
</style>

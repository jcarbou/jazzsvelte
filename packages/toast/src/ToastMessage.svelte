<script lang="ts">
    import { preventDefault } from 'svelte/legacy'

    import type {
        HTMLButtonAttributes,
        IconComponent,
        ResolvedIconPT,
        HTMLDivAttributes,
        PassThroughOptions,
        HTMLSpanAttributes
    } from '@jazzsvelte/api'

    import type { ToastMessagePassThroughMethodOptions, ToastMessageProps } from './toastMessage.types'

    import { defaultToastMessageProps as DEFAULT, globalToastMessagePT as globalPt } from './toastMessage.config'
    import { resolveIconPT, resolvePT, localeOption } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { ripple } from '@jazzsvelte/ripple'
    import { InfoCircleIcon } from '@jazzsvelte/infocircle_icon'
    import { ExclamationTriangleIcon } from '@jazzsvelte/exclamationtriangle_icon'
    import { TimesCircleIcon } from '@jazzsvelte/timescircle_icon'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import { closeToast } from './toast.store'

    let _props = $props()

    let {
        timerId = null,
        status,
        class: className = DEFAULT.class,
        ariaCloseLabel = DEFAULT.ariaCloseLabel || null,
        closable = DEFAULT.closable,
        closeIcon = DEFAULT.closeIcon,
        contentClass = DEFAULT.contentClass,
        contentStyle = DEFAULT.contentStyle,
        customContent = DEFAULT.customContent,
        customProps = DEFAULT.customProps,
        detail = DEFAULT.detail,
        icon = DEFAULT.icon,
        onClose = DEFAULT.onClose,
        onClick = DEFAULT.onClick,
        pt = null,
        ptOptions = null,
        severity = DEFAULT.severity,
        sticky = DEFAULT.sticky,
        style = DEFAULT.style,
        summary = DEFAULT.summary,
        unstyled = DEFAULT.unstyled
    }: ToastMessageProps = _props

    export const displayName = 'ToastMessage'

    const icons: { [key: string]: IconComponent } = {
        info: InfoCircleIcon,
        warn: ExclamationTriangleIcon,
        error: TimesCircleIcon,
        success: CheckIcon
    }

    let _icon: string | IconComponent | null = $derived(icon || (severity && icons[severity]) || null)

    let ptContext: ToastMessagePassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: _props,
        ptOptions,
        unstyled
    })

    // "icon" element
    let resolvedIcon: ResolvedIconPT = $derived(
        resolveIconPT(_icon, { class: ['p-toast-message-icon', 'p-icon'] }, pt?.icon, globalPt?.icon, ptContext)
    )

    // "close button" element
    let closeButtonAttributes: HTMLButtonAttributes = $derived(
        resolvePT(
            {
                class: ['p-toast-icon-close', 'p-link'],
                'aria-label': ariaCloseLabel || localeOption('close')
            },
            pt?.closeButton,
            globalPt?.closeButton,
            ptContext
        )
    )

    // "closeButton" element
    let resolvedCloseIcon: ResolvedIconPT = $derived(
        resolveIconPT(
            closeIcon,
            { class: ['p-toast-icon-close-icon', 'p-icon'] },
            pt?.closeButtonIcon,
            globalPt?.closeButtonIcon,
            ptContext
        )
    )

    // "content" element
    let contentAttributes: HTMLDivAttributes = $derived(
        resolvePT(
            {
                class: ['p-toast-message-content', contentClass],
                style: contentStyle
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "message" element
    let messageAttributes: HTMLDivAttributes = $derived(
        resolvePT(
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
        )
    )

    // "text" element
    let textAttributes: HTMLDivAttributes = $derived(
        resolvePT({ class: ['p-toast-message-text'] }, pt?.text, globalPt?.text, ptContext)
    )

    // "summary" element
    let summaryAttributes: HTMLSpanAttributes = $derived(
        resolvePT({ class: ['p-toast-summary'] }, pt?.summary, globalPt?.summary, ptContext)
    )

    // "summary" element
    let detailAttributes: HTMLDivAttributes = $derived(
        resolvePT({ class: ['p-toast-detail'] }, pt?.detail, globalPt?.detail, ptContext)
    )

    function _onMouseEnter(event: MouseEvent) {
        // do not continue if the user has canceled the event
        if (event.defaultPrevented) return

        // stop timer while user has focused message
        !sticky && timerId !== null && clearTimeout(timerId)
    }

    function _onClick() {
        onClick?.(status)
    }

    let _onClose = (event: Event) => {
        event.preventDefault()
        closeToast(status)
        onClose?.(status)
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmouseenter={_onMouseEnter} onclick={_onClick} {...messageAttributes}>
    <div {...contentAttributes}>
        {#if customContent}
            {@const SvelteComponent_1 = customContent}
            <SvelteComponent_1 {..._props} {...customProps} />
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
                <button type="button" {...closeButtonAttributes} onclick={preventDefault(_onClose)} use:ripple>
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

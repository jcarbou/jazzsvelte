<script lang="ts">
    import type { ButtonProps, ButtonPtContext } from './button.types'
    import type { JazzSvelteContext } from '@jazzsvelte/api'
    import type { ButtonGroupContext } from './buttonGroup.types'

    import { resolveButtonPt, resolveIconPT, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { Badge } from '@jazzsvelte/badge'
    import { getContext } from 'svelte'
    import { SIZE_VALUE_TO_CSS, getIconPos, isIconPos } from './button.utils'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { defaultButtonProps as DEFAULT, globalButtonPT as globalPt } from './button.config'
    import { focusEl } from '@jazzsvelte/dom'
    import { stopProgagation } from '@jazzsvelte/stop_propagation_action'

    let {
        children,
        badge = DEFAULT.badge,
        badgeSnippet = null,
        class: className = DEFAULT.class,
        disabled = DEFAULT.disabled,
        icon = DEFAULT.icon,
        iconPos = DEFAULT.iconPos,
        label = null,
        labelSnippet = null,
        link = DEFAULT.link,
        loading = DEFAULT.loading,
        loadingIcon = DEFAULT.loadingIcon,
        outlined = DEFAULT.outlined,
        plain = DEFAULT.plain,
        pt = null,
        ptOptions = null,
        raised = DEFAULT.raised,
        rounded = DEFAULT.rounded,
        severity = DEFAULT.severity,
        size = DEFAULT.size,
        style = DEFAULT.style,
        text = DEFAULT.text,
        tooltip: tooltipContent = null,
        tooltipOptions = undefined,
        unstyled = DEFAULT.unstyled,
        visible = DEFAULT.visible,
        ..._restProps
    }: ButtonProps = $props()

    let _props: ButtonProps = $derived({
        badge,
        badgeSnippet,
        class: className,
        disabled,
        icon,
        iconPos,
        label,
        labelSnippet,
        link,
        loading,
        loadingIcon,
        outlined,
        plain,
        pt,
        ptOptions,
        raised,
        rounded,
        severity,
        size,
        style,
        text,
        tooltip: tooltipContent,
        tooltipOptions,
        unstyled,
        visible
    })

    export const displayName = 'Button'
    export const focus = (scrollTo?: boolean) => {
        focusEl(buttonEl, scrollTo)
    }
    export const blur = () => {
        buttonEl.blur()
    }
    export function getElement(): HTMLButtonElement {
        return buttonEl
    }

    // svelte-ignore non_reactive_update
    let buttonEl: HTMLButtonElement

    const buttonGroup = getContext<ButtonGroupContext>('buttonGroup')

    let _severity = $derived(severity ?? buttonGroup?.severity)
    let _hasLabel: boolean = $derived(!!label || !!labelSnippet)

    let ptContext: ButtonPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: { disabled, iconOnly: (!!icon || loading) && !_hasLabel },
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveButtonPt(
            {
                class: [
                    'p-button p-component',
                    className,
                    {
                        'p-button-icon-only': (!!icon || loading) && !_hasLabel,
                        'p-button-vertical': isIconPos(iconPos, buttonGroup, ['top', 'bottom']) && _hasLabel,
                        'p-disabled': disabled || loading,
                        'p-button-loading': loading,
                        'p-button-outlined': outlined || buttonGroup?.outlined,
                        'p-button-raised': raised,
                        'p-button-link': link,
                        'p-button-text': text,
                        'p-button-rounded': rounded || buttonGroup?.rounded,
                        'p-button-loading-label-only': loading && !icon && _hasLabel,
                        [`p-button-loading-${getIconPos(iconPos, buttonGroup)}`]: loading && _hasLabel,
                        [`p-button-${SIZE_VALUE_TO_CSS[size || buttonGroup?.size || 'normal']}`]: !!(size || buttonGroup?.size),
                        [`p-button-${_severity}`]: !!_severity,
                        'p-button-plain': plain
                    }
                ],
                style,
                'data-pc-name': 'button',
                'data-pc-section': 'root',
                'aria-label': _restProps['aria-label'] ?? (label ? label + (badge ? ' ' + badge : '') : '')
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "label element"
    let labelAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-button-label p-c'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "icon element"
    let resolvedIcon = $derived(
        resolveIconPT(
            icon,
            {
                class: [
                    'p-button-icon p-c p-icon',
                    {
                        [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: _hasLabel
                    }
                ]
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    // "loading icon element"
    let resolvedLoadingIcon = $derived(
        resolveIconPT(
            loadingIcon,
            {
                class: [
                    'p-button-icon p-c',
                    'p-icon-spin',
                    'pi',
                    'p-icon',
                    {
                        [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: _hasLabel
                    }
                ]
            },
            pt?.loadingIcon,
            globalPt?.loadingIcon,
            ptContext
        )
    )

    // "badge" element
    let badgeAttributes = $derived(
        resolveSpanPt(
            {
                class: [],
                'data-pc-section': 'badge'
            },
            pt?.badge,
            globalPt?.badge,
            ptContext
        )
    )

    let showOnDisabled: boolean = $derived(!!tooltipOptions?.showOnDisabled)
    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    let ripple = $derived(jazzSvelteContext.ripple)
</script>

{#if visible}
    <TooltipTargetDisabled {showOnDisabled} useTooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
        <button
            bind:this={buttonEl}
            {disabled}
            {...rootAttributes}
            {..._restProps}
            use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
            use:stopProgagation={{ eventName: 'click', stopCondition: () => disabled }}
        >
            {#if icon && !loading}
                <IconBuilder {resolvedIcon} />
            {:else if loadingIcon && loading}
                <IconBuilder resolvedIcon={resolvedLoadingIcon} spin={true} />
            {/if}
            {#if label}
                <span {...labelAttributes}>{label}</span>
            {:else if labelSnippet}
                {@render labelSnippet(labelAttributes)}
            {/if}
            {#if badge}
                <Badge value={badge} {...badgeAttributes}></Badge>
            {:else if badgeSnippet}
                {@render badgeSnippet(badgeAttributes)}
            {/if}
            {#if children}
                {@render children()}
            {/if}
            {#if !disabled && $ripple}
                <Ripple />
            {/if}
        </button>
    </TooltipTargetDisabled>
{/if}

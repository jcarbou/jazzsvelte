<script lang="ts">
    import type {
        ButtonIconPos,
        ButtonPassThroughMethodOptions,
        ButtonPassThroughOptions,
        ButtonSeverity,
        ButtonSize
    } from './button.types'
    import type {
        JazzSvelteContext,
        HTMLSpanAttributes,
        HTMLButtonAttributes,
        CssStyle,
        IconComponent,
        ResolvedIconPT,
        PassThroughOptions
    } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'

    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { Badge } from '@jazzsvelte/badge'
    import { createEventDispatcher, getContext } from 'svelte'
    import { SIZE_VALUE_TO_CSS, getIconPos, isIconPos } from './button.utils'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { defaultButtonProps as DEFAULT, globalButtonPT as globalPt } from './button.config'
    import { ButtonGroupContext } from './buttonGroup.types'
    import { focusEl } from '@jazzsvelte/dom'

    export let disabled: boolean = DEFAULT.disabled
    export let icon: string | IconComponent | null = DEFAULT.icon
    export let text: boolean = DEFAULT.text
    export let rounded: boolean = DEFAULT.rounded
    export let raised: boolean = DEFAULT.raised
    export let outlined: boolean = DEFAULT.outlined
    export let link: boolean = DEFAULT.link
    export let severity: ButtonSeverity | null = DEFAULT.severity
    export let iconPos: ButtonIconPos | null = DEFAULT.iconPos
    export let size: ButtonSize | null = DEFAULT.size
    export let label: string | null = DEFAULT.label
    export let loading: boolean = DEFAULT.loading
    export let loadingIcon: string | IconComponent | null = DEFAULT.loadingIcon
    export let plain: boolean = DEFAULT.plain
    let tooltipContent: string | null = null
    export { tooltipContent as tooltip }
    export let tooltipOptions: TooltipOptions | undefined = undefined
    export let visible: boolean = DEFAULT.visible
    export let pt: ButtonPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let unstyled: boolean = DEFAULT.unstyled
    let className: string | null = DEFAULT.class
    export { className as class }
    export let style: CssStyle = DEFAULT.style
    export let badge: string | number | null = DEFAULT.badge
    export const displayName = 'Button'
    export const focus = (scrollTo?: boolean) => {
        focusEl(buttonEl, scrollTo)
    }
    export const blur = () => {
        buttonEl.blur()
    }

    let buttonEl: HTMLButtonElement
    const buttonGroup = getContext<ButtonGroupContext>('buttonGroup')
    const dispatch = createEventDispatcher()

    function onClick(ev: MouseEvent) {
        if (!disabled) dispatch('click', { originEvent: ev })
    }

    $: _severity = severity ?? buttonGroup?.severity
    $: label = label ?? $$props['aria-label']
    $: ptContext = {
        props: $$props,
        context: { disabled },
        ptOptions,
        unstyled
    } satisfies ButtonPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: [
                'p-button p-component',
                className,
                {
                    'p-button-icon-only': (!!icon || loading) && !label,
                    'p-button-vertical': isIconPos(iconPos, buttonGroup, ['top', 'bottom']) && !!label,
                    'p-disabled': disabled || loading,
                    'p-button-loading': loading,
                    'p-button-outlined': outlined || buttonGroup?.outlined,
                    'p-button-raised': raised,
                    'p-button-link': link,
                    'p-button-text': text,
                    'p-button-rounded': rounded || buttonGroup?.rounded,
                    'p-button-loading-label-only': loading && !icon && !!label,
                    [`p-button-loading-${getIconPos(iconPos, buttonGroup)}`]: loading && !!label,
                    [`p-button-${SIZE_VALUE_TO_CSS[size || buttonGroup?.size || 'normal']}`]: !!(size || buttonGroup?.size),
                    [`p-button-${_severity}`]: !!_severity,
                    'p-button-plain': plain
                }
            ],
            style,
            'data-pc-name': 'button',
            'data-pc-section': 'root',
            'aria-label': label ? label + (badge ? ' ' + badge : '') : ''
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLButtonAttributes

    // "label element"
    $: labelAttributes = resolvePT(
        {
            class: ['p-button-label p-c'],
            'data-pc-section': 'label'
        },
        pt?.label,
        globalPt?.label,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "icon element"
    $: resolvedIcon = resolveIconPT(
        icon,
        {
            class: [
                'p-button-icon p-c',
                {
                    [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: !!label
                }
            ]
        },
        pt?.icon,
        globalPt?.icon,
        ptContext
    ) satisfies ResolvedIconPT

    // "loading icon element"
    $: resolvedLoadingIcon = resolveIconPT(
        loadingIcon,
        {
            class: [
                'p-button-icon p-c',
                'p-icon-spin',
                'pi',
                {
                    [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: !!label
                }
            ]
        },
        pt?.loadingIcon,
        globalPt?.loadingIcon,
        ptContext
    ) satisfies ResolvedIconPT

    // "badge" element
    $: badgeAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'badge'
        },
        pt?.badge,
        globalPt?.badge,
        ptContext
    ) satisfies HTMLSpanAttributes

    $: showOnDisabled = !!tooltipOptions?.showOnDisabled satisfies boolean

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    $: ripple = jazzSvelteContext.ripple
</script>

{#if visible}
    <TooltipTargetDisabled {showOnDisabled} useTooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
        <button
            bind:this={buttonEl}
            {disabled}
            {...rootAttributes}
            {...$$restProps}
            use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
            on:click={onClick}
        >
            {#if icon && !loading}
                <IconBuilder {resolvedIcon} />
            {:else if loadingIcon && loading}
                <IconBuilder resolvedIcon={resolvedLoadingIcon} spin={true} />
            {/if}
            {#if label}
                <span {...labelAttributes}>{label}</span>
            {/if}
            {#if badge}
                <Badge value={badge} {...badgeAttributes}></Badge>
            {/if}
            <slot name="badge" />
            <slot />
            {#if !disabled && $ripple}
                <Ripple />
            {/if}
        </button>
    </TooltipTargetDisabled>
{/if}

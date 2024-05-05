<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements'
    import type { ButtonGroupContext, ButtonPassThroughMethodOptions, ButtonPassThroughOptions } from './button.types'
    import type { JazzSvelteContext, HTMLSpanAttributes, CssStyle, IconComponent, ResolvedIconPT } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'

    import { resolveIconPT, resolvePT, JAZZ_SVELTE } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { SpinnerIcon } from '@jazzsvelte/spinner_icon'
    import { Ripple } from '@jazzsvelte/ripple'
    import { Badge } from '@jazzsvelte/badge'
    import { getContext } from 'svelte'
    import { SIZE_VALUE_TO_CSS, getIconPos, isIconPos } from './button.utils'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'

    export let disabled: boolean = false
    export let icon: string | null = null
    export let text: boolean = false
    export let rounded: boolean = false
    export let raised: boolean = false
    export let outlined: boolean = false
    export let link: boolean = false
    export let severity: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | null = null
    export let iconPos: 'top' | 'bottom' | 'left' | 'right' | null = null
    export let size: 'small' | 'normal' | 'large' | null = null
    export let label: string | null = null
    export let loading: boolean = false
    export let loadingIcon: string | IconComponent | null = SpinnerIcon //'pi-spinner'
    export let plain: boolean = false
    let tooltipContent: string | null = null
    export { tooltipContent as tooltip }
    export let tooltipOptions: TooltipOptions | undefined = undefined
    export let visible: boolean = true
    export let pt: ButtonPassThroughOptions | null = null
    export let ptOptions: ButtonPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    let className: string | null = null
    export { className as class }
    export let style: CssStyle = null
    export let badge: string | number | null = null
    //export let badgeClass: string | null = null => Use badge slot instead

    let ripple = JAZZ_SVELTE.ripple
    const buttonGroup = getContext<ButtonGroupContext>('buttonGroup')

    $: label = label ?? $$props['aria-label']

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
                    [`p-button-${severity}`]: !!severity,
                    'p-button-plain': plain
                }
            ],
            style,
            'data-pc-name': 'button',
            'data-pc-section': 'root',
            'aria-label': label ? label + (badge ? ' ' + badge : '') : ''
        },
        pt?.root,
        JAZZ_SVELTE.pt?.button?.root,
        ptOptions,
        unstyled
    ) satisfies HTMLButtonAttributes

    // "label element"
    $: labelAttributes = resolvePT(
        {
            class: ['p-button-label p-c'],
            'data-pc-section': 'label'
        },
        pt?.label,
        JAZZ_SVELTE.pt?.button?.label,
        ptOptions,
        unstyled
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
        JAZZ_SVELTE.pt?.button?.icon,
        ptOptions,
        unstyled
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
        JAZZ_SVELTE.pt?.button?.loadingIcon,
        ptOptions,
        unstyled
    ) satisfies ResolvedIconPT

    $: showOnDisabled = !!tooltipOptions?.showOnDisabled satisfies boolean

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

{#if visible}
    <TooltipTargetDisabled {showOnDisabled} useTooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
        <button
            {disabled}
            {...rootAttributes}
            {...$$restProps}
            use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
            on:click
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
                <Badge value={badge}></Badge>
            {/if}
            <slot name="badge" />
            <slot />
            {#if !disabled && $ripple}
                <Ripple />
            {/if}
        </button>
    </TooltipTargetDisabled>
{/if}

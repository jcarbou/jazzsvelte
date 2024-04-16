<script lang="ts">
    import type { CssStyle } from '../utils/cssStyles'
    import type { ButtonGroupContext, ButtonPassThroughMethodOptions, ButtonPassThroughOptions } from './button.types'
    import type { HTMLButtonAttributes } from 'svelte/elements'
    import type { HTMLSpanAttributes } from '../utils/utils.types'
    import type { TooltipOptions } from '../tooltip/tooltipOptions.types'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'
    import Ripple from '../ripple/Ripple.svelte'
    import Badge from '../badge/Badge.svelte'
    import { getContext } from 'svelte'
    import { SIZE_VALUE_TO_CSS, getIconPos, isIconPos } from './button.utils'
    import { tooltip } from '../tooltip/tooltip.actions'
    import TooltipTargetDisabled from '../tooltip/TooltipTargetDisabled.svelte'

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
    export let loadingIcon: string | null = 'pi-spinner'
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

    $: defaultAriaLabel = label ? label + (badge ? ' ' + badge : '') : ''

    // "root element"
    $: rootAttributes = resolvePT(
        [
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
        pt?.root,
        JAZZ_SVELTE.pt?.button?.root,
        ptOptions,
        unstyled
    ) satisfies HTMLButtonAttributes

    // "label element"
    $: labelAttributes = resolvePT(
        ['p-button-label p-c'],
        style,
        pt?.label,
        JAZZ_SVELTE.pt?.button?.label,
        ptOptions,
        unstyled
    ) satisfies HTMLSpanAttributes

    // "icon element"
    $: iconAttributes = resolvePT(
        [
            'p-button-icon p-c',
            icon,
            {
                [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: !!label
            }
        ],
        null,
        pt?.icon,
        JAZZ_SVELTE.pt?.button?.icon,
        ptOptions,
        unstyled
    ) satisfies HTMLSpanAttributes

    // "loading icon element"
    $: loadingiconAttributes = resolvePT(
        [
            'p-button-icon p-c',
            'p-icon-spin',
            'pi',
            loadingIcon,
            {
                [`p-button-icon-${getIconPos(iconPos, buttonGroup)}`]: !!label
            }
        ],
        null,
        pt?.loadingIcon,
        JAZZ_SVELTE.pt?.button?.loadingIcon,
        ptOptions,
        unstyled
    ) satisfies HTMLSpanAttributes

    $: showOnDisabled = !!tooltipOptions?.showOnDisabled satisfies boolean
</script>

{#if visible}
    <TooltipTargetDisabled {showOnDisabled} useTooltip={{ content: tooltipContent, options: tooltipOptions }}>
        <button
            data-pc-name="button"
            data-pc-section="root"
            {disabled}
            aria-label={defaultAriaLabel}
            {...rootAttributes}
            {...$$restProps}
            use:tooltip={{ content: showOnDisabled ? null : tooltipContent, options: tooltipOptions }}
            on:click
        >
            {#if icon && !loading}
                <span data-pc-section="icon" {...iconAttributes}></span>
            {:else if loadingIcon && loading}
                <span data-pc-section="icon" {...loadingiconAttributes}></span>
            {/if}
            {#if label}
                <span data-pc-section="label" {...labelAttributes}>{label}</span>
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

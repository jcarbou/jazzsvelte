<script lang="ts">
    import type { CssStyle } from '../utils/cssStyles'
    import type { ButtonPassThroughMethodOptions, ButtonPassThroughOptions, RootHTMLAttributes } from './button.types'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'
    import Ripple from '../ripple/Ripple.svelte'
    import Badge from '../badge/Badge.svelte'

    export let disabled: boolean = false
    export let icon: string | null = null
    export let text: boolean = false
    export let rounded: boolean = false
    export let raised: boolean = false
    export let outlined: boolean = false
    export let link: boolean = false
    export let severity: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | null = null
    export let size: 'small' | 'large' | null = null
    export let iconPos: 'top' | 'bottom' | 'left' | 'right' | null = null
    export let label: string | null = null
    export let loading: boolean = false
    export let loadingIcon: string | null = null
    export let plain: boolean = false
    //export let tooltip: string | null = null
    export let visible: boolean = true
    export let pt: ButtonPassThroughOptions | null = null
    export let ptOptions: ButtonPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null
    export let badge: string | number | null = null
    export let badgeClass: string | null = null
    export let ariaLabel: string | null = null

    let ripple = JAZZ_SVELTE.ripple

    $: defaultAriaLabel = label ? label + (badge ? ' ' + badge : '') : ariaLabel

    // "root element"
    $: rootAttributes = resolvePT(
        [
            'p-button p-component',
            {
                'p-button-icon-only': (!!icon || loading) && !label,
                'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && !!label,
                'p-disabled': disabled,
                'p-button-loading': loading,
                'p-button-outlined': outlined,
                'p-button-raised': raised,
                'p-button-link': link,
                'p-button-text': text,
                'p-button-rounded': rounded,
                'p-button-loading-label-only': loading && !icon && !!label,
                [`p-button-loading-${iconPos}`]: loading && !!label,
                [`p-button-${size}`]: !!size,
                [`p-button-${severity}`]: !!severity,
                'p-button-plain': plain
            }
        ],
        style,
        pt?.root,
        JAZZ_SVELTE.pt?.button?.root,
        ptOptions,
        unstyled
    )

    // "label element"
    $: labelAttributes = resolvePT(['p-button-label p-c'], style, pt?.label, JAZZ_SVELTE.pt?.button?.label, ptOptions, unstyled)

    // "icon element"
    $: iconAttributes = resolvePT(
        [
            'p-button-icon p-c',
            icon,
            {
                [`p-button-icon-${iconPos}`]: !!label
            }
        ],
        style,
        pt?.icon,
        JAZZ_SVELTE.pt?.button?.icon,
        ptOptions,
        unstyled
    )

    // "loading icon element"
    $: loadingiconAttributes = resolvePT(
        [
            'p-button-icon p-c',
            loadingIcon,
            {
                [`p-button-icon-${iconPos}`]: !!label
            }
        ],
        style,
        pt?.loadingIcon,
        JAZZ_SVELTE.pt?.button?.loadingIcon,
        ptOptions,
        unstyled
    )
</script>

{#if visible}
    <button
        data-pc-name="button"
        data-pc-section="root"
        {disabled}
        aria-label={defaultAriaLabel}
        {...rootAttributes}
        {...$$restProps}
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
            <Badge class={badgeClass} value={badge}></Badge>
        {/if}
        <slot name="badge" />
        <slot />
        {#if !disabled && $ripple}
            <Ripple />
        {/if}
    </button>
{/if}

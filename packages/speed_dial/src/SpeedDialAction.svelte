<script lang="ts">
    import type { HTMLAnchorAttributes, JazzSvelteContext, MenuItem, PassThroughOptions, ResolvedIconPT } from '@jazzsvelte/api'
    import type { SpeedDialContext, SpeedDialPassThroughMethodOptions, SpeedDialPassThroughOptions } from './speedDial.types'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { globalSpeedDialPT as globalPt } from './speedDial.config'
    import { getContext } from 'svelte'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { getTooltipContent, tooltip } from '@jazzsvelte/tooltip'
    import { Ripple } from '@jazzsvelte/ripple'

    export let item: MenuItem
    export let pt: SpeedDialPassThroughOptions | null = null
    export let ptContext: SpeedDialPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
    export let unstyled: boolean = false

    // "action" attributes
    $: actionAttributes = resolvePT(
        {
            href: item.url || '#',
            role: 'menuitem',
            class: [
                item.class,
                'p-speeddial-action',
                {
                    'p-disabled': !!item.disabled
                }
            ],
            'data-pc-section': 'action',
            'aria-label': item.label,
            style: item.style,
            target: item.target,
            tabIndex: '-1',
            'data-pr-tooltip': item.label
        },
        pt?.action,
        globalPt?.action,
        ptContext
    ) satisfies HTMLAnchorAttributes

    const onItemClick = (e: MouseEvent) => {
        speedDialContext.onItemClick(e, item)
    }

    // "actionIcon" element
    $: resolvedActionIcon = resolveIconPT(
        item.icon || null,
        {
            class: ['p-speeddial-action-icon', 'p-icon']
        },
        pt?.actionIcon,
        globalPt?.actionIcon,
        ptContext
    ) satisfies ResolvedIconPT

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    let speedDialContext = getContext<SpeedDialContext>('speedDial')
    let { getTooltip, tooltipOptions } = speedDialContext

    $: ripple = jazzSvelteContext.ripple
    $: tooltipContent = getTooltipContent(getTooltip, item)
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<a {...actionAttributes} on:click={onItemClick} use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
    <IconBuilder resolvedIcon={resolvedActionIcon} />

    {#if !item.disabled && $ripple}
        <Ripple />
    {/if}
</a>

<script lang="ts">
    import type { JazzSvelteContext, MenuItem, PassThroughOptions } from '@jazzsvelte/api'
    import type { SpeedDialContext, SpeedDialPassThroughMethodOptions, SpeedDialPassThroughOptions } from './speedDial.types'

    import { resolveAnchorPt, resolveIconPT } from '@jazzsvelte/api'
    import { globalSpeedDialPT as globalPt } from './speedDial.config'
    import { getContext } from 'svelte'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { getTooltipContent, tooltip } from '@jazzsvelte/tooltip'
    import { Ripple } from '@jazzsvelte/ripple'

    interface Props {
        item: MenuItem
        pt?: SpeedDialPassThroughOptions | null
        ptContext: SpeedDialPassThroughMethodOptions & {
            ptOptions: PassThroughOptions | null
            unstyled: boolean
        }
        unstyled?: boolean
    }

    let { item, pt = null, ptContext }: Props = $props()

    // "action" attributes
    let actionAttributes = $derived(
        resolveAnchorPt(
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
                tabindex: -1,
                'data-pr-tooltip': item.label
            },
            pt?.action,
            globalPt?.action,
            ptContext
        )
    )

    // "actionIcon" element
    let resolvedActionIcon = $derived(
        resolveIconPT(
            item.icon || null,
            {
                class: ['p-speeddial-action-icon', 'p-icon']
            },
            pt?.actionIcon,
            globalPt?.actionIcon,
            ptContext
        )
    )

    const onItemClick = (e: MouseEvent) => {
        speedDialContext.onItemClick(e, item)
    }

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    let speedDialContext = getContext<SpeedDialContext>('speedDial')
    let { getTooltip, tooltipOptions } = speedDialContext

    let ripple = $derived(jazzSvelteContext.ripple)
    let tooltipContent = $derived(getTooltipContent(getTooltip, item))
</script>

<a
    {...actionAttributes}
    onclick={onItemClick}
    role="button"
    tabindex="-1"
    use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}
>
    <IconBuilder resolvedIcon={resolvedActionIcon} />

    {#if !item.disabled && $ripple}
        <Ripple />
    {/if}
</a>

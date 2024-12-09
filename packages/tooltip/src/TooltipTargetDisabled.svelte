<script lang="ts">
    import { Snippet } from 'svelte'
    import { tooltip } from './tooltip.actions'
    import type { TooltipActionOptions } from './tooltip.types'

    interface Props {
        showOnDisabled?: boolean
        useTooltip: TooltipActionOptions // Disabled elements do not trigger user interactions due to standard behavior.
        children?: Snippet
    }

    let { showOnDisabled = false, useTooltip, children }: Props = $props()

    // A common workaround for such cases is wrapping the disabled element with another
    // element that has a tooltip attached. This component implements this workaround
    // for component with tooltip (<slot> : the component)
</script>

{#if showOnDisabled}
    <span use:tooltip={useTooltip}>
        {@render children?.()}
    </span>
{:else}
    {@render children?.()}
{/if}

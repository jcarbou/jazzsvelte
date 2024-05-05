<script lang="ts">
    import { tooltip } from './tooltip.actions'
    import type { TooltipActionOptions } from './tooltip.types'

    export let showOnDisabled: boolean = false
    export let useTooltip: TooltipActionOptions

    // Disabled elements do not trigger user interactions due to standard behavior.
    // A common workaround for such cases is wrapping the disabled element with another
    // element that has a tooltip attached. This component implements this workaround
    // for component with tooltip (<slot> : the component)
</script>

{#if showOnDisabled}
    <span use:tooltip={useTooltip}>
        <slot />
    </span>
{:else}
    <slot />
{/if}

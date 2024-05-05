<script lang="ts">
    import type { ResolvedIconPT } from '@jazzsvelte/api'

    export let resolvedIcon: ResolvedIconPT | null = null
    export let spin: boolean = false
</script>

{#if resolvedIcon?.spanAttributes}
    <span data-pc-section="icon" {...resolvedIcon.spanAttributes}></span>
{:else if resolvedIcon?.svgAttributes && resolvedIcon?.iconComponent}
    <svelte:component this={resolvedIcon?.iconComponent} {spin} {...resolvedIcon?.svgAttributes} />
{/if}

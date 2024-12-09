<script lang="ts">
    import type { ResolvedIconPT } from '@jazzsvelte/api'

    interface Props {
        resolvedIcon?: ResolvedIconPT | null;
        spin?: boolean;
    }

    let { resolvedIcon = null, spin = false }: Props = $props();
</script>

{#if resolvedIcon?.spanAttributes}
    <span data-pc-section="icon" {...resolvedIcon.spanAttributes}></span>
{:else if resolvedIcon?.svgAttributes && resolvedIcon?.iconComponent}
    {@const SvelteComponent = resolvedIcon?.iconComponent}
    <SvelteComponent {spin} {...resolvedIcon?.svgAttributes} />
{/if}

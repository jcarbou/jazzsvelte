<script lang="ts">
    import type { HTMLButtonAttributes, ResolvedIconPT, JazzSvelteContext } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { getContext } from 'svelte'

    export let togglerAttributes: HTMLButtonAttributes
    export let toggle: (event?: Event) => void
    export let resolvedTogglerIcon: ResolvedIconPT

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    $: ripple = jazzSvelteContext.ripple
</script>

<button {...togglerAttributes} on:click={toggle}>
    <IconBuilder resolvedIcon={resolvedTogglerIcon} />
    {#if $ripple}
        <Ripple />
    {/if}
</button>

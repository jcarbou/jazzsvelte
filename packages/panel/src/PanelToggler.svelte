<script lang="ts">
    import type { HTMLButtonAttributes, ResolvedIconPT, JazzSvelteContext } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { Ripple } from '@jazzsvelte/ripple'
    import { getContext } from 'svelte'

    interface Props {
        togglerAttributes: HTMLButtonAttributes
        toggle: (event?: Event) => void
        resolvedTogglerIcon: ResolvedIconPT
    }

    let { togglerAttributes, toggle, resolvedTogglerIcon }: Props = $props()

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    let ripple = $derived(jazzSvelteContext.ripple)
</script>

<button {...togglerAttributes} onclick={toggle}>
    <IconBuilder resolvedIcon={resolvedTogglerIcon} />
    {#if $ripple}
        <Ripple />
    {/if}
</button>

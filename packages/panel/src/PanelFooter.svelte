<script lang="ts">
    import type { PanelFooterProps } from './panel.types'

    import { snippetValueOrNull, stringValueOrNull } from '@jazzsvelte/utils'

    let { footerAttributes, footer }: PanelFooterProps = $props()

    let _footerSnippet = $derived(snippetValueOrNull(footer))
    let _footerString = $derived(stringValueOrNull(footer))
</script>

<div {...footerAttributes}>
    {#if _footerSnippet}
        {@render _footerSnippet()}
    {:else}
        {_footerString}
    {/if}
</div>

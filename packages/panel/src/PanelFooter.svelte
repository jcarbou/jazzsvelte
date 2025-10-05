<script lang="ts">
    import type { PanelFooterProps } from './panel.types'

    let { footerAttributes, footer, footerSnippet }: PanelFooterProps = $props()
</script>

<div {...footerAttributes}>
    {#if footerSnippet}
        {@render footerSnippet()}
    {:else}
        {footer}
    {/if}
</div>

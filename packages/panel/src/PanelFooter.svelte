<script lang="ts">
    import type { HTMLDivAttributes } from '@jazzsvelte/api'

    export let footerAttributes: HTMLDivAttributes
    export let footer: string
</script>

<div {...footerAttributes}>
    {#if $$slots.footer_content}
        <slot name="footer_content" {footer} />
    {:else}
        {footer}
    {/if}
</div>
s

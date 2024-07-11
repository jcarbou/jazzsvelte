<script lang="ts">
    import { page } from '$app/stores'
    import type { LinkEntry } from './doc.types'
    import { scrollToAnchor } from './doc.utils'

    export let link: LinkEntry
    const { pathname } = $page.url
</script>

{#if link.linkTarget}
    {link.index !== 0 ? ' | ' : ''}
    <a href={pathname + `#${link.linkTarget}`} target="_self" on:click={() => scrollToAnchor(link.linkTarget, 'smooth')}>
        {link.label}
    </a>
{:else}
    {link.index !== 0 ? ' | ' : ''}
    {@html link.label}
{/if}

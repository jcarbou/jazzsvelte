<script lang="ts">
    import { getContext } from 'svelte'
    import { page } from '$app/stores'
    import type { Doc, SectionNavContext } from './doc.types'
    import { onLinkClickScrollToAnchor } from './doc.utils'

    export let doc: Doc
    export const level: number = 0

    const { pathname } = $page.url
    const activeId = getContext<SectionNavContext>('docSectionNav')?.activeId
</script>

<li class="navbar-item" class:active-navbar-item={activeId === doc.id}>
    <div class="navbar-item-content">
        <a href={`${pathname}#${doc.id}`} class="px-link" on:click={onLinkClickScrollToAnchor} title={doc.label}>
            {doc.label}
        </a>
    </div>

    {#if doc.children}
        <ul>
            {#each doc.children as subDoc, i (subDoc.id)}
                <svelte:self doc={subDoc} level={level + 1} />
            {/each}
        </ul>
    {/if}
</li>

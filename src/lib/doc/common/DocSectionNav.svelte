<script lang="ts">
    import { onMount, setContext } from 'svelte'
    import { page } from '$app/stores'
    import type { Doc, SectionNavContext } from './doc.types'
    import DocSectionNavItem from './DocSectionNavItem.svelte'

    export let docs: Doc[]
    export let activeId: string | undefined = undefined

    if (activeId) {
        setContext<SectionNavContext>('docSectionNav', { activeId })
    }

    $: {
        const { hash } = $page.url
        const hashId = hash?.substring(1)
        activeId = hashId ?? docs[0].id

        setContext<SectionNavContext>('docSectionNav', { activeId })
    }
</script>

<ul class="doc-section-nav">
    {#each docs as doc, i (doc.id)}
        <DocSectionNavItem {doc} level={0} />
    {/each}
</ul>

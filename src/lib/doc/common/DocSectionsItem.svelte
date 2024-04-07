<script lang="ts">
    import DocApiTable from './DocApiTable.svelte'
    import DocSectionText from './DocSectionText.svelte'
    import type { Doc } from './doc.types'
    import { toDocSection } from './doc.utils'

    export let doc: Doc
    export let level: number = 2
</script>

{#if doc.children}
    <DocSectionText docSection={toDocSection(doc, level)}>
        {#if doc.description}
            <p>{doc.description}</p>
        {/if}
    </DocSectionText>
    {#each doc.children as child, i (child.id)}
        {#if child.component}
            <svelte:component this={child.component} docSection={toDocSection(child, level + 1)} />
        {:else if child.docApiData}
            <DocApiTable apiData={child.docApiData} />
        {:else if child.children}
            <svelte:self doc={child} level={level + 1} />
        {/if}
    {/each}
{/if}

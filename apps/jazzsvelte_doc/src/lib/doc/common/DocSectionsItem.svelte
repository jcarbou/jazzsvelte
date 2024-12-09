<script lang="ts">
    import DocSectionsItem from './DocSectionsItem.svelte'
    import DocApiTable from './DocApiTable.svelte'
    import DocSectionText from './DocSectionText.svelte'
    import type { Doc } from './doc.types'
    import { toDocSection } from './doc.utils'

    interface Props {
        doc: Doc
        level?: number
    }

    let { doc, level = 2 }: Props = $props()
</script>

{#if doc.children}
    <DocSectionText docSection={toDocSection(doc, level)}>
        {#if doc.description}
            <p>{doc.description}</p>
        {/if}
    </DocSectionText>
    {#each doc.children as child, i (child.id)}
        {#if child.component}
            <child.component docSection={toDocSection(child, level + 1)} />
        {:else if child.docApiData}
            <DocApiTable apiData={child.docApiData} />
        {:else if child.children}
            <DocSectionsItem doc={child} level={level + 1} />
        {/if}
    {/each}
{/if}

<script lang="ts">
    import DocSectionsItem from './DocSectionsItem.svelte'
    import type { Doc } from './doc.types'
    import { toDocSection } from './doc.utils'

    export let docs: Doc[]
</script>

{#each docs as doc, i (`${doc.label}_${i}`)}
    <section class="py-4">
        {#if doc.children}
            <DocSectionsItem {doc} />
        {:else if doc.component}
            <svelte:component this={doc.component} docSection={toDocSection(doc)} />
        {:else if doc.docApiTable}
            <svelte:component this={doc.docApiTable} {...doc.docApiData} />
        {/if}
    </section>
{/each}

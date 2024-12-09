<script lang="ts">
    import type { DocSection, ApiTableInfo, DocApiData } from './doc.types'
    import { setContext } from 'svelte'
    import { isNotEmpty } from '@jazzsvelte/object'
    import DocSectionText from './DocSectionText.svelte'
    import DocApiTableBody from './DocApiTableBody.svelte'
    import DocTableWrapper from './DocTableWrapper.svelte'

    interface Props {
        apiData: DocApiData
    }

    let { apiData }: Props = $props()
    let docSection: DocSection = $derived({ id: apiData.id, label: apiData.label })

    setContext<ApiTableInfo>('apiTabelInfo', apiData)
</script>

{#snippet theadContent()}
    <tr>
        {#if apiData.isPT}
            {#each apiData.headers as header, index (index)}
                <th>{header}</th>
            {/each}
        {:else}
            {#each apiData.headers as header, index (index)}
                {#if header !== 'readonly' && header !== 'optional' && header !== 'deprecated'}
                    <th>{header}</th>
                {/if}
            {/each}
        {/if}
    </tr>
{/snippet}

{#snippet tBodyContent()}
    <DocApiTableBody />
{/snippet}

{#if isNotEmpty(apiData?.data)}
    <DocSectionText {docSection}>
        <p>{apiData.description}</p>
    </DocSectionText>
    <DocTableWrapper {theadContent} {tBodyContent} />
{/if}

<style lang="scss">
    .doc-tablewrapper {
        overflow: auto;
    }

    .doc-table {
        border-collapse: collapse;
        width: 100%;
        min-width: 960px;
        margin-bottom: 1.5rem;

        th {
            border-bottom: 1px solid var(--surface-border);
            padding: 0.75rem 1rem;
            text-align: left;
            text-transform: capitalize;
        }
    }
</style>

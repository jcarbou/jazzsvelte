<script lang="ts">
    import type { DocSection, ApiTableInfo, DataItem, DocApiData } from './doc.types'
    import { setContext } from 'svelte'
    import { isNotEmpty } from '$lib/components/utils/ObjectUtils'
    import DocSectionText from './DocSectionText.svelte'
    import DocApiTableBody from './DocApiTableBody.svelte'
    import DocTableWrapper from './DocTableWrapper.svelte'

    export let apiData: DocApiData

    let docSection: DocSection
    let isPT: boolean
    let headers: string[]

    $: {
        if (apiData?.data?.length) {
            docSection = { id: apiData.id, label: '' }
            isPT = apiData.id.startsWith('pt.')
            headers = Object.keys(apiData.data?.[0])

            setContext<ApiTableInfo>('apiTabelInfo', {
                ...apiData,
                isPT,
                headers
            })
        }
    }
</script>

{#if isNotEmpty(apiData?.data)}
    <DocSectionText {docSection}>
        <p>{apiData.description}</p>
    </DocSectionText>
    <DocTableWrapper>
        <tr slot="thead">
            {#if isPT}
                {#each headers as header, index (index)}
                    <th>{header}</th>
                {/each}
            {:else}
                {#each headers as header, index (index)}
                    {#if header !== 'readonly' && header !== 'optional' && header !== 'deprecated'}
                        <th>{header}</th>
                    {/if}
                {/each}
            {/if}
        </tr>
        <DocApiTableBody slot="tbody" />
    </DocTableWrapper>
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

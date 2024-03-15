<script lang="ts">
    import type { DocSection, ApiTableInfo, DataItem, DocApiData } from './doc.types'
    import { setContext } from 'svelte'
    import { isNotEmpty } from '$lib/components/utils/ObjectUtils'
    import DocSectionText from './DocSectionText.svelte'
    import DocApiTableBody from './DocApiTableBody.svelte'

    export let apiData: DocApiData

    let docSection: DocSection
    let isPT: boolean
    let headers: string[]

    $: {
        docSection = { id: apiData.id, label: '' }
        isPT = apiData.id.startsWith('pt.')
        headers = Object.keys(apiData.data[0])

        setContext<ApiTableInfo>('apiTabelInfo', {
            ...apiData,
            isPT,
            headers
        })
    }
</script>

{#if isNotEmpty(apiData.data)}
    <DocSectionText {docSection}>
        <p>{apiData.description}</p>
    </DocSectionText>
    <div class="doc-tablewrapper">
        <table class="doc-table">
            <thead>
                <tr>
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
            </thead>
            <tbody>
                <DocApiTableBody />
            </tbody>
        </table>
    </div>
{/if}

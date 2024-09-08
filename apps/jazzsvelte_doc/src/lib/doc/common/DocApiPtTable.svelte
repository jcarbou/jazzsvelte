<script lang="ts">
    import { getContext } from 'svelte'
    import type { Doc, DocSection } from './doc.types'
    //import { buildPtApiRows } from './oldDocApiData'
    import DocSimpleTable from './DocSimpleTable.svelte'
    import DocSectionText from './DocSectionText.svelte'
    import type { ApiDocData } from '@jazzsvelte/api'

    export let docSection: DocSection

    let rows: string[][] | undefined

    $: {
        const apiDocs = getContext<ApiDocData[]>('apiData')
        const ptOptions = apiDocs[0].ptOptions
        rows = ptOptions?.values.map(({ name, description }, index) => [index + 1 + '', name + '', description + ''])
    }
</script>

{#if rows}
    <DocSectionText {docSection} />
    <DocSimpleTable headers={['Value', 'Label', 'Description']} {rows} />
{/if}

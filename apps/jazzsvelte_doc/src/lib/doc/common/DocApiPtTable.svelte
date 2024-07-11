<script lang="ts">
    import { getContext } from 'svelte'
    import type { Doc, DocSection } from './doc.types'
    import { buildPtApiRows } from './oldDocApiData'
    import DocSimpleTable from './DocSimpleTable.svelte'
    import DocSectionText from './DocSectionText.svelte'

    export let docSection: DocSection

    let rows: string[][] | null

    $: {
        const apiDocs = getContext<Doc[]>('apiDocs')
        rows = buildPtApiRows(apiDocs)
    }
</script>

{#if rows}
    <DocSectionText {docSection} />
    <DocSimpleTable headers={['Value', 'Label', 'Description']} {rows} />
{/if}

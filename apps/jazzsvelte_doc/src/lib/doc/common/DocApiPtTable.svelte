<script lang="ts">
    import { getContext } from 'svelte'
    import type { DocSection } from './doc.types'
    import DocSimpleTable from './DocSimpleTable.svelte'
    import DocSectionText from './DocSectionText.svelte'
    import type { ApiDocData } from '@jazzsvelte/api'

    interface Props {
        docSection: DocSection
    }

    let { docSection }: Props = $props()
    let rows: string[][] | undefined = $state()

    const apiDocs = getContext<ApiDocData[]>('apiData')
    const ptOptions = apiDocs[0].ptOptions
    rows = ptOptions?.values.map(({ name, description }, index) => [index + 1 + '', name + '', description + ''])
</script>

{#if rows}
    <DocSectionText {docSection} />
    <DocSimpleTable headers={['Value', 'Label', 'Description']} {rows} />
{/if}

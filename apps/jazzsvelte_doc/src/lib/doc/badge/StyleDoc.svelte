<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import DocSimpleTable from '../common/DocSimpleTable.svelte'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming">theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-badge', 'Badge element'],
        ['p-overlay-badge', 'Wrapper of a badge and its target.'],
        ['p-badge-dot', 'Badge element with no value.'],
        ['p-badge-success', 'Badge element with success severity.'],
        ['p-badge-info', 'Badge element with info severity.'],
        ['p-badge-warning', 'Badge element with warning severity.'],
        ['p-badge-danger', 'Badge element with danger severity.'],
        ['p-badge-lg', 'Large badge element'],
        ['p-badge-xl', 'Extra large badge element']
    ]}
/>

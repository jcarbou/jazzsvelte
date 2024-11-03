<script lang="ts">
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

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
        ['p-virtualscroller', 'Container element.'],
        ['p-virtualscroller-content', 'Content element.'],
        ['p-virtualscroller-loader', 'Loader element.'],
        ['p-virtualscroller-both', 'Container element when horizontal and vertical scrolling enabled.'],
        ['p-virtualscroller-horizontal', 'Container element when horizontal orientation.']
    ]}
/>

<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
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
        ['p-speeddial', 'Container element.'],
        ['p-speeddial-button', 'Button element of speeddial.'],
        ['p-speeddial-mask', 'Mask element of speeddial.'],
        ['p-speeddial-list', 'List of the actions.'],
        ['p-speeddial-item', 'Each action item of list.']
    ]}
/>

<script lang="ts">
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    let { docSection }: ComponentDocProps = $props()
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

<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-steps', 'Container element.'],
        ['p-steps-item', 'Menuitem element.'],
        ['p-steps-number', 'Number of menuitem.'],
        ['p-steps-title', 'Label of menuitem.']
    ]}
/>

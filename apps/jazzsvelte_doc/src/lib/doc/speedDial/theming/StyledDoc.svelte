<script lang="ts">
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import DocSectionText from '../../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
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

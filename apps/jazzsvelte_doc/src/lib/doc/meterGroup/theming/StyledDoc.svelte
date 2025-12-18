<script lang="ts">
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import DocSectionText from '../../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-metergroup', 'Container element.'],
        ['p-metergroup-horizontal', 'Container element when orientation mode is horizontal.'],
        ['p-metergroup-vertical', 'Container element when orientation mode is vertical.'],
        ['p-metergroup-meter-container', 'Container of the meters.'],
        ['p-metergroup-meter', 'Content of a meter.'],
        ['p-metergroup-label-list', 'Container element of the list of labels.'],
        ['p-metergroup-label-list-start', 'Container element when label position is start.'],
        ['p-metergroup-label-list-end', 'Container element when label position is end.'],
        ['p-metergroup-label-list-horizontal', 'Container element when label orientation is horizontal.'],
        ['p-metergroup-label-list-vertical', 'Container element when label orientation is vertical.'],
        ['p-metergroup-label-list-item', 'Container element of a list item.'],
        ['p-metergroup-label-list-type', 'Container element of a list type.'],
        ['p-metergroup-label', 'Content of a label.']
    ]}
/>

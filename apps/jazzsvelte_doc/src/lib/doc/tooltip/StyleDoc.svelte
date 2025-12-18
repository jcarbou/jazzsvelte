<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let {}: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>Following is the list of structural style classes</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-tooltip', 'Container element'],
        ['p-tooltip-arrow', 'Arrow of the tooltip'],
        ['p-tooltip-text', 'Text of the tooltip']
    ]}
/>

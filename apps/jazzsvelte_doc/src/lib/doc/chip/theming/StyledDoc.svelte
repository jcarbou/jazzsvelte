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
        ['p-chip', 'Container element.'],
        ['p-chip-image', 'Container element in image mode.'],
        ['p-chip-text', 'Text of the chip.'],
        ['pi-chip-remove-icon', 'Remove icon.']
    ]}
/>

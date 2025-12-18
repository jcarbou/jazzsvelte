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
        ['p-virtualscroller', 'Container element.'],
        ['p-virtualscroller-content', 'Content element.'],
        ['p-virtualscroller-loader', 'Loader element.'],
        ['p-virtualscroller-both', 'Container element when horizontal and vertical scrolling enabled.'],
        ['p-virtualscroller-horizontal', 'Container element when horizontal orientation.']
    ]}
/>

<script lang="ts">
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-panel', 'Container element.'],
        ['p-panel-header', 'Header section.'],
        ['p-panel-title', 'Title text of panel.'],
        ['p-panel-toggler', 'Toggle icon.'],
        ['p-panel-content', 'Content of panel.']
    ]}
/>

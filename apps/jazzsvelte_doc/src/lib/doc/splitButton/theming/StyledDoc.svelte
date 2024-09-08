<script lang="ts">
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-splitbutton', 'Container element.'],
        ['p-splitbutton-button', 'Dropdown button.'],
        ['p-menu', 'Overlay menu.']
    ]}
/>

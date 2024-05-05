<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
    import DocTableWrapper from '$lib/doc/common/DocTableWrapper.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-button', 'Button element'],
        ['p-button-icon', 'Icon element'],
        ['p-button-text', 'Label element of the button']
    ]}
/>

<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
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
        ['p-toast', 'Main container element.'],
        ['p-toast-container', 'Container of a message item.'],
        ['p-toast-item', 'Message element.'],
        ['p-toast-icon-close', 'Close icon of a message.'],
        ['p-toast-image', 'Severity icon.'],
        ['p-toast-message', 'Container of message texts.'],
        ['p-toast-title', 'Summary of the message.']
    ]}
/>

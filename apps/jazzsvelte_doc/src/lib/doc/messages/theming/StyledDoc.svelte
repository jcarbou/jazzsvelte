<script lang="ts">
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
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
        ['p-message', 'Container element.'],
        ['p-message-info', 'Container element when displaying info messages.'],
        ['p-message-warn', 'Container element when displaying warning messages.'],
        ['p-message-error', 'Container element when displaying error messages.'],
        ['p-message-success', 'Container element when displaying success messages.'],
        ['p-message-close', 'Close icon.'],
        ['p-message-icon', 'Severity icon.'],
        ['p-message-summary', 'Summary of a message.'],
        ['p-message-detail', 'Detail of a message.']
    ]}
/>

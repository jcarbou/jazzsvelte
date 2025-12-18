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
        ['p-messages', 'Container element.'],
        ['p-messages-info', 'Container element when displaying info messages.'],
        ['p-messages-warn', 'Container element when displaying warning messages.'],
        ['p-messages-error', 'Container element when displaying error messages.'],
        ['p-messages-success', 'Container element when displaying success messages.'],
        ['p-messages-close', 'Close icon.'],
        ['p-messages-icon', 'Severity icon.'],
        ['p-messages-summary', 'Summary of a message.'],
        ['p-messages-detail', 'Detail of a message.']
    ]}
/>

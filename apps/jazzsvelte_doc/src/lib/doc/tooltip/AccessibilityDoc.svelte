<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Tooltip component uses <i>tooltip</i> role and when it becomes visible the generated id of the tooltip is defined as the
        <i>aria-describedby</i> of the target.
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable headers={['Key', 'Function']} rows={[['<i>escape</i>', 'Closes the tooltip when focus is on the target.']]} />
</DocSectionText>

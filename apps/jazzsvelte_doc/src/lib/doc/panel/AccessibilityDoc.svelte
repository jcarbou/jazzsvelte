<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Toggleable panels use a content toggle button at the header that has <i>aria-controls</i> to define the id of the content
        section along with <i>aria-expanded</i> for the visibility state. The value to read the button defaults to the value of
        the <i>header</i> property and can be customized by defining an <i>aria-label</i> or <i>aria-labelledby</i> via the
        <i>toggleButtonProps</i> property.
    </p>
    <p>
        The content uses <i>region</i>, defines an id that matches the <i>aria-controls</i> of the content toggle button and
        <i>aria-labelledby</i> referring to the id of the header.
    </p>

    <h3>Content Toggle Button Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>tab</i>', 'Moves focus to the next the focusable element in the page tab sequence.'],
            ['<i>shift</i> + <i>tab</i>', 'Moves focus to the previous the focusable element in the page tab sequence.'],
            ['<i>enter</i>', 'Toggles the visibility of the content.'],
            ['<i>space</i>', 'Toggles the visibility of the content.']
        ]}
    />
</DocSectionText>

<script lang="ts">
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        TabMenu component uses the <i>menubar</i> role and the value to describe the menu can either be provided with
        <i>aria-labelledby</i>
        or <i>aria-label</i> props. Each list item has a <i>presentation</i> role whereas anchor elements have a <i>menuitem</i>
        role with <i>aria-label</i> referring to the label of the item and <i>aria-disabled</i> defined if the item is disabled.
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            [
                '<i>tab</i>',
                'Adds focus to the active tab header when focus moves in to the component, if there is already a focused tab header moves the focus out of the component based on the page tab sequence.'
            ],
            ['<i>enter</i>', 'Activates the focused tab header.'],
            ['<i>space</i>', 'Activates the focused tab header.'],
            ['<i>right arrow</i>', 'Moves focus to the next header.'],
            ['<i>left arrow</i>', 'Moves focus to the previous header.'],
            ['<i>home</i>', 'Moves focus to the first header.'],
            ['<i>end</i>', 'Moves focus to the last header.']
        ]}
    />
</DocSectionText>

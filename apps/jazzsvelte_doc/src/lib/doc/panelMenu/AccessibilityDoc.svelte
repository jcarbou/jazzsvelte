<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Accordion header elements have a <i>button</i> role, an <i>aria-label</i> defined using the <i>label</i> property of the
        menuitem model and <i>aria-controls</i> to define the id of the content section along with <i>aria-expanded</i>{' '}
        for the visibility state.
    </p>
    <p>
        The content of an accordion panel uses <i>region</i> role, defines an id that matches the <i>aria-controls</i> of the
        header and <i>aria-labelledby</i> referring to the id of the header.
    </p>

    <p>
        The tree elements has a <i>tree</i> as the role and each menu item has a <i>treeitem</i> role along with
        <i>aria-label</i>, <i>aria-selected</i> and <i>aria-expanded</i> attributes. The container element of a treenode has the{' '}
        <i>group</i> role. The <i>aria-setsize</i>, <i>aria-posinset</i> and <i>aria-level</i> attributes are calculated implicitly
        and added to each treeitem.
    </p>

    <h3>Header Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            [
                '<i>tab</i>',
                'Adds focus to the first header when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence.'
            ],
            ['<i>enter</i>', 'Toggles the visibility of the content.'],
            ['<i>space</i>', 'Toggles the visibility of the content.'],
            [
                '<i>down arrow</i>',
                'If panel is collapsed then moves focus to the next header, otherwise first treenode of the panel receives the focus.'
            ],
            [
                '<i>up arrow</i>',
                'If previous panel is collapsed then moves focus to the previous header, otherwise last treenode of the previous panel receives the focus.'
            ],
            ['<i>home</i>', 'Moves focus to the first header.'],
            ['<i>end</i>', 'Moves focus to the last header.']
        ]}
    />

    <h3>Tree Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function', 'Key', 'Function']}
        rows={[
            [
                '<i>tab</i>',
                'Adds focus to the first header when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence.'
            ],
            ['<i>enter</i>', 'Toggles the visibility of the content.'],
            ['<i>space</i>', 'Toggles the visibility of the content.'],
            [
                '<i>down arrow</i>',
                'If panel is collapsed then moves focus to the next header, otherwise first treenode of the panel receives the focus.'
            ],
            [
                '<i>up arrow</i>',
                'If previous panel is collapsed then moves focus to the previous header, otherwise last treenode of the previous panel receives the focus.'
            ],
            ['<i>home</i>', 'Moves focus to the first header.'],
            ['<i>end</i>', 'Moves focus to the last header.'],
            [],
            ['<i>tab</i>', 'Moves focus to the next focusable element in the page tab order.'],
            ['<i>shift</i> + <i>tab</i>', 'Moves focus to the previous focusable element in the page tab order.'],
            ['<i>enter</i>', 'Activates the focused treenode.'],
            ['<i>space</i>', 'Activates the focused treenode.'],
            ['<i>down arrow</i>', 'Moves focus to the next treenode.'],
            ['<i>up arrow</i>', 'Moves focus to the previous treenode.'],
            ['<i>right arrow</i>', 'If node is closed, opens the node otherwise moves focus to the first child node.'],
            ['<i>left arrow</i>', 'If node is open, closes the node otherwise moves focus to the parent node.']
        ]}
    />
</DocSectionText>

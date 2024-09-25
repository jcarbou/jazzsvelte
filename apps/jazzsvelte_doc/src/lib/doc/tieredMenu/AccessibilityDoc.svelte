<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        TieredMenu component uses the <i>menubar</i> role with <i>aria-orientation</i> set to "vertical" and the value to describe
        the menu can either be provided with <i>aria-labelledby</i> or <i>aria-label</i> props. Each list item has a{' '}
        <i>presentation</i> role whereas anchor elements have a <i>menuitem</i> role with <i>aria-label</i> referring to the label
        of the item and <i>aria-disabled</i> defined if the item is disabled. A submenu within a TieredMenu uses the{' '}
        <i>menu</i> role with an <i>aria-labelledby</i> defined as the id of the submenu root menuitem label. In addition,
        menuitems that open a submenu have <i>aria-haspopup</i>, <i>aria-expanded</i> and <i>aria-controls</i> to define the relation
        between the item and the submenu.
    </p>

    <p>
        In popup mode, the component implicitly manages the <i>aria-expanded</i>, <i>aria-haspopup</i> and <i>aria-controls</i> attributes
        of the target element to define the relation between the target and the popup.
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            [
                '<i>tab</i>',
                'Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.'
            ],
            [
                '<i>shift</i> + <i>tab</i>',
                'Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.'
            ],
            [
                '<i>enter</i>',
                'If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.'
            ],
            [
                '<i>space</i>',
                'If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.'
            ],
            [
                '<i>escape</i>',
                'If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu.'
            ],
            ['<i>down arrow</i>', 'Moves focus to the next menuitem within the submenu.'],
            ['<i>up arrow</i>', 'Moves focus to the previous menuitem within the submenu.'],
            ['<i>right arrow</i>', 'Opens a submenu if there is one available and moves focus to the first item.'],
            ['<i>left arrow</i>', 'Closes a submenu and moves focus to the root item of the closed submenu.'],
            ['<i>home</i>', 'Moves focus to the first menuitem within the submenu.'],
            ['<i>end</i>', 'Moves focus to the last menuitem within the submenu.'],
            ['<i>any printable character</i>', 'Moves focus to the menuitem whose label starts with the characters being typed.']
        ]}
    />
</DocSectionText>

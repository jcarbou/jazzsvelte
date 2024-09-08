<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import CodeHighlight from '$lib/doc/common/CodeHighlight.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        SplitButton component renders two native button elements, main button uses the label property to define <i>aria-label</i>
        by default which can be customized with <i>buttonProps</i>. Dropdown button requires an explicit definition to describe it
        using <i>menuButtonProps</i> option and also includes <i>aria-haspopup</i>, <i>aria-expanded</i> for states along with
        <i>aria-controls</i> to define the relation between the popup and the button.
    </p>

    <p>
        The popup overlay uses <i>menu</i> role on the list and each action item has a <i>menuitem</i> role with an
        <i>aria-label</i>
        as the menuitem label. The id of the menu refers to the <i>aria-controls</i> of the dropdown button.
    </p>
    <CodeHighlight>
        {`
<SplitButton buttonProps={{'aria-label': 'Default Action'}} menuButtonProps={{'aria-label': 'More Options'}} />
`}
    </CodeHighlight>

    <h3>Main Button Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>enter</i>', 'Activates the button.'],
            ['<i>space</i>', 'Activates the button.']
        ]}
    />

    <h3>Menu Button Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>enter</i>', 'Activates the button.'],
            ['<i>space</i>', 'Activates the button.'],
            [],
            ['<i>enter</i>', 'Toggles the visibility of the menu.'],
            ['<i>space</i>', 'Toggles the visibility of the menu.'],
            ['<i>down arrow</i>', 'Opens the menu and moves focus to the first item.'],
            ['<i>up arrow</i>', 'Opens the menu and moves focus to the last item.']
        ]}
    />

    <h3>Menu Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>enter</i>', 'Activates the button.'],
            ['<i>space</i>', 'Activates the button.'],
            [],
            ['<i>enter</i>', 'Toggles the visibility of the menu.'],
            ['<i>space</i>', 'Toggles the visibility of the menu.'],
            ['<i>down arrow</i>', 'Opens the menu and moves focus to the first item.'],
            ['<i>up arrow</i>', 'Opens the menu and moves focus to the last item.'],
            [],
            ['<i>enter</i>', 'Actives the menuitem, closes the menu and sets focus on the menu button.'],
            ['<i>escape</i>', 'Closes the menu and sets focus on the menu button.'],
            ['<i>down arrow</i>', 'Moves focus to the next item, if it is the last one then first item receives the focus.'],
            ['<i>up arrow</i>', 'Moves focus to the previous item, if it is the first one then last item receives the focus.'],
            ['<i>home</i>', 'Moves focus to the first item.'],
            ['<i>end</i>', 'Moves focus to the last item.']
        ]}
    />
</DocSectionText>

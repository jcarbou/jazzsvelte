<script lang="ts">
    import type { ComponentDocProps } from '../common/doc.types'

    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import DocTableWrapper from '../common/DocTableWrapper.svelte'

    let {}: ComponentDocProps = $props()

    const code = {
        basic: `
<SpeedDial aria-label="Options" />
    `
    }
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        SpeedDial component renders a native button element that implicitly includes any passed prop. Text to describe the button
        can be defined with the <i>aria-labelledby</i> or <i>aria-label</i> props. Addititonally the button includes includes
        <i>aria-haspopup</i>, <i>aria-expanded</i> for states along with <i>aria-controls</i> to define the relation between the popup
        and the button.
    </p>

    <p>
        The popup overlay uses <i>menu</i> role on the list and each action item has a <i>menuitem</i> role with an
        <i>aria-label</i>
        as the menuitem label. The id of the menu refers to the <i>aria-controls</i> of the button.
    </p>

    <DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

    <h3>Menu Button Keyboard Support</h3>
    <DocTableWrapper keyStyle="button">
        {#snippet theadContent()}
            <tr>
                <th>Key</th>
                <th>Function</th>
            </tr>
        {/snippet}
        {#snippet tBodyContent()}
            <tr>
                <td>
                    <i>enter</i>
                </td>
                <td>Toggles the visibility of the menu.</td>
            </tr>
            <tr>
                <td>
                    <i>space</i>
                </td>
                <td>Toggles the visibility of the menu.</td>
            </tr>
            <tr>
                <td>
                    <i>down arrow</i>
                </td>
                <td>Opens the menu and moves focus to the first item.</td>
            </tr>
            <tr>
                <td>
                    <i>up arrow</i>
                </td>
                <td>Opens the menu and moves focus to the last item.</td>
            </tr>
        {/snippet}
    </DocTableWrapper>

    <h3>Menu Keyboard Support</h3>
    <DocTableWrapper keyStyle="button">
        {#snippet theadContent()}
            <tr>
                <th>Key</th>
                <th>Function</th>
            </tr>
        {/snippet}
        {#snippet tBodyContent()}
            <tr>
                <td>
                    <i>enter</i>
                </td>
                <td>Actives the menuitem, closes the menu and sets focus on the menu button.</td>
            </tr>
            <tr>
                <td>
                    <i>escape</i>
                </td>
                <td>Closes the menu and sets focus on the menu button.</td>
            </tr>
            <tr>
                <td>
                    <i>arrow keys</i>
                </td>
                <td>Navigates between the menu items.</td>
            </tr>
            <tr>
                <td>
                    <i>home</i>
                </td>
                <td>Moves focus to the first item.</td>
            </tr>
            <tr>
                <td>
                    <i>end</i>
                </td>
                <td>Moves focus to the last item.</td>
            </tr>
        {/snippet}
    </DocTableWrapper>
</DocSectionText>

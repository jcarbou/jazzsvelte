<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-tieredmenu', 'Container element.'],
        ['p-menu-list', 'List element.'],
        ['p-menuitem', 'Menuitem element.'],
        ['p-menuitem-text', 'Label of a menuitem.'],
        ['p-menuitem-icon', 'Icon of a menuitem.'],
        ['p-submenu-icon', 'Arrow icon of a submenu.']
    ]}
/>

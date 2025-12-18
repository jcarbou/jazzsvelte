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
        ['p-tieredmenu', 'Container element.'],
        ['p-menu-list', 'List element.'],
        ['p-menuitem', 'Menuitem element.'],
        ['p-menuitem-text', 'Label of a menuitem.'],
        ['p-menuitem-icon', 'Icon of a menuitem.'],
        ['p-submenu-icon', 'Arrow icon of a submenu.']
    ]}
/>

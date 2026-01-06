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
        ['p-panelmenu', 'Container element.'],
        ['p-panelmenu-header', 'Accordion header of root submenu.'],
        ['p-panelmenu-content', 'Accordion content of root submenu.'],
        ['p-submenu-list', 'List element.'],
        ['p-menuitem', 'Menuitem element.'],
        ['p-menuitem-text', 'Label of a menuitem.'],
        ['p-menuitem-icon', 'Icon of a menuitem.'],
        ['p-panelmenu-icon', 'Arrow icon of an accordion header.']
    ]}
/>

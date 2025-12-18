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
        ['p-tabmenu', 'Container element.'],
        ['p-tabmenu-nav', 'List element of headers.'],
        ['p-tabmenuitem', 'Menuitem element.'],
        ['p-menuitem-link', 'Link inside a menuitem.'],
        ['p-menuitem-text', 'Label of a menuitem.'],
        ['p-menuitem-icon', 'Icon of a menuitem.']
    ]}
/>

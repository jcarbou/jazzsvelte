<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
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

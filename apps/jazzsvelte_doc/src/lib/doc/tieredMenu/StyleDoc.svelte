<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
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

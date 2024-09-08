<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-splitbutton', 'Container element.'],
        ['p-splitbutton-button', 'Dropdown button.'],
        ['p-tieredmenu', 'Overlay menu.']
    ]}
/>

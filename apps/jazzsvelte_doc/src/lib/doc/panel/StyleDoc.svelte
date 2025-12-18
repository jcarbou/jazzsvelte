<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let {}: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-panel', 'Container element.'],
        ['p-panel-titlebar', 'Header section.'],
        ['p-panel-title', 'Title text of panel.'],
        ['p-panel-titlebar-toggler', 'Toggle icon.'],
        ['p-panel-content', 'Content of panel.']
    ]}
/>

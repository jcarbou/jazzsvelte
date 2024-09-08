<script lang="ts">
    import BasicDoc from './BasicDoc.svelte'
    import { projectName } from '../common/doc.utils'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import { buttonGroupApiData } from '@jazzsvelte/button_group'
    import type { Doc } from '../common/doc.types'

    const docs = [
        {
            id: 'buttonset',
            label: 'Button Group',
            component: BasicDoc
        }
    ]

    const ptDocs = [
        {
            id: 'pt.button.options',
            label: 'Button PT Options',
            component: DocApiPtTable
        }
    ]
</script>

<DocComponent
    title="{projectName} Button Group Component"
    header="Button Group"
    description="Multiple buttons are grouped when wrapped inside an element with ButtonGroup component."
    apiDocData={[buttonGroupApiData]}
    {docs}
    {ptDocs}
/>

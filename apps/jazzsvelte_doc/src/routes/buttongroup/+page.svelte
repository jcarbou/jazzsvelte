<script lang="ts">
    import ButtonGroup from '$lib/doc/buttonGroup/ButtonGroupDoc.svelte'
    import { apiDataToDocs, projectName } from '$lib/doc/common/doc.utils'
    import DocApiPtTable from '$lib/doc/common/DocApiPtTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import { buttonGroupApiData } from '@jazzsvelte/button_group'

    const docs = [
        {
            id: 'buttonset',
            label: 'Button Group',
            component: ButtonGroup
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
    componentDocs={docs}
    apiDocs={[apiDataToDocs(buttonGroupApiData)]}
    {ptDocs}
/>

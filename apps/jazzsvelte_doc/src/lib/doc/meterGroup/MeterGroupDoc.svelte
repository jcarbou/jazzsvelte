<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { meterGroupApiData } from '@jazzsvelte/meter_group'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import IconDoc from './IconDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import MultipleDoc from './MultipleDoc.svelte'
    import LabelDoc from './LabelDoc.svelte'
    import VerticalDoc from './VerticalDoc.svelte'
    import MinMaxDoc from './MinMaxDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'min-max',
            label: 'Min-Max',
            component: MinMaxDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ]

    const ptDocs = [
        {
            id: 'pt.wireframe',
            label: 'Wireframe',
            component: Wireframe
        },
        {
            id: 'pt.metergroup.options',
            label: 'MeterGroup PT Options',
            component: DocApiPtTable
        }
    ]

    const themingDocs = [
        {
            id: 'styled',
            label: 'Styled',
            component: StyledDoc
        }
    ]
</script>

<DocComponent
    title="{projectName} MeterGroup Component"
    header="MeterGroup"
    description="MeterGroup displays scalar measurements within a known range."
    {docs}
    apiDocData={[meterGroupApiData]}
    {themingDocs}
    {ptDocs}
/>;

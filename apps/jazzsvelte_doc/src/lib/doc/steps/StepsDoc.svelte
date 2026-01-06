<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { stepsApiData } from '@jazzsvelte/steps'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import ControlledDoc from './ControlledDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import InteractiveDoc from './InteractiveDoc.svelte'
    import LinearDoc from './LinearDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import ItemTemplateDoc from './ItemTemplateDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'

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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'linear',
            label: 'Linear',
            component: LinearDoc
        },
        {
            id: 'interactive',
            label: 'Interactive',
            component: InteractiveDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'itemTemplate',
            label: 'Item Template',
            component: ItemTemplateDoc
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
            id: 'pt.steps.options',
            label: 'Steps PT Options',
            component: DocApiPtTable
        }
    ]

    const themingDocs = [
        {
            id: 'styled',
            label: 'Styled',
            component: StyledDoc
        },
        {
            id: 'unstyled',
            label: 'Unstyled',
            description: 'Theming is implemented with the pass through properties in unstyled mode.',
            children: [
                {
                    id: 'tailwind',
                    label: 'Tailwind',
                    component: TailwindDoc
                }
            ]
        }
    ]
</script>

<DocComponent
    title="{projectName} Stepper Component"
    header="Steps"
    description="Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design."
    {docs}
    apiDocData={[stepsApiData]}
    class="steps-demo"
    {ptDocs}
    {themingDocs}
/>

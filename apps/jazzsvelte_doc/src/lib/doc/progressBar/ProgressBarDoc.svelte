<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { progressBarApiData } from '@jazzsvelte/progress_bar'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import DynamicDoc from './DynamicDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import IndeterminateDoc from './IndeterminateDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'

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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'indeterminate',
            label: 'Indeterminate',
            component: IndeterminateDoc
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
            id: 'pt.progressbar.options',
            label: 'ProgressBar PT Options',
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
    title="{projectName} ProgressBar Component"
    header="ProgressBar"
    description="ProgressBar is a process status indicator."
    {docs}
    apiDocData={[progressBarApiData]}
    {ptDocs}
    {themingDocs}
/>;

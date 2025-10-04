<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { progressSpinnerApiData } from '@jazzsvelte/progress_spinner'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import CustomDoc from './CustomDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
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
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
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
            id: 'pt.progressspinner.options',
            label: 'ProgressSpinner PT Options',
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
    title="{projectName} ProgressSpinner Component"
    header="ProgressSpinner"
    description="ProgressSpinner is a process status indicator."
    {docs}
    apiDocData={[progressSpinnerApiData]}
    {ptDocs}
    {themingDocs}
/>;

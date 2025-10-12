<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { messageApiData } from '@jazzsvelte/message'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import SeverityDoc from './SeverityDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import ValidationDoc from './ValidationDoc.svelte'

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
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'form',
            label: 'Form',
            component: ValidationDoc
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
            id: 'pt.message.options',
            label: 'Message PT Options',
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
    title="{projectName} Message Component"
    header="Message"
    description="Message component displays information related to another element such as invalid input."
    {docs}
    apiDocData={[messageApiData]}
    {ptDocs}
    {themingDocs}
/>

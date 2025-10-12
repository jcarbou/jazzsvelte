<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { cardApiData } from '@jazzsvelte/card'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import AdvancedDoc from './AdvancedDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import DocApiPtTable from '../common/DocApiTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'

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
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
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
            id: 'pt.card.options',
            label: 'Card PT Options',
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
    title="{projectName} Card Component"
    header="Card"
    description="Card is a flexible container component."
    {docs}
    apiDocData={[cardApiData]}
    {ptDocs}
    {themingDocs}
/>;

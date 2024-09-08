<script lang="ts">
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import HeadlessDoc from './HeadlessDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import MultipleDoc from './MultipleDoc.svelte'
    import PositionDoc from './PositionDoc.svelte'
    import PtDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import SeverityDoc from './SeverityDoc.svelte'
    import StickyDoc from './StickyDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { toastApiData, toastMessageApiData } from '@jazzsvelte/toast'
    import type { Doc } from '../common/doc.types'

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
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'stickydoc',
            label: 'Sticky',
            component: StickyDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
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
            id: 'pt.toast.options',
            label: 'Toast PT Options',
            component: DocApiPtTable
        },
        {
            id: 'pt.demo',
            label: 'Example',
            component: PtDoc
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
    title="React Toast Component"
    header="Toast"
    description="Toast is used to display messages in an overlay."
    apiDocData={[toastApiData, toastMessageApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>;

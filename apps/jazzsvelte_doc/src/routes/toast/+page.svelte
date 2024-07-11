<script lang="ts">
    import { apiDataToDocs } from '$lib/doc/common/doc.utils'
    import DocApiTable from '$lib/doc/common/DocApiTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/toast/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/toast/BasicDoc.svelte'
    import HeadlessDoc from '$lib/doc/toast/HeadlessDoc.svelte'
    import ImportDoc from '$lib/doc/toast/ImportDoc.svelte'
    import MultipleDoc from '$lib/doc/toast/MultipleDoc.svelte'
    import PositionDoc from '$lib/doc/toast/PositionDoc.svelte'
    import PtDoc from '$lib/doc/toast/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/toast/pt/Wireframe.svelte'
    import SeverityDoc from '$lib/doc/toast/SeverityDoc.svelte'
    import StickyDoc from '$lib/doc/toast/StickyDoc.svelte'
    import TemplateDoc from '$lib/doc/toast/TemplateDoc.svelte'
    import StyledDoc from '$lib/doc/toast/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/toast/theming/TailwindDoc.svelte'
    import { toastApiData } from '@jazzsvelte/toast'

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
            component: DocApiTable
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
    componentDocs={docs}
    apiDocs={[apiDataToDocs(toastApiData)]}
    {ptDocs}
    {themingDocs}
/>;

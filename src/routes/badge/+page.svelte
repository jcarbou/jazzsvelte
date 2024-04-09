<script lang="ts">
    import AccessibilityDoc from '$lib/doc/badge/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/badge/BasicDoc.svelte'
    import ButtonDoc from '$lib/doc/badge/ButtonDoc.svelte'
    import ImportDoc from '$lib/doc/badge/ImportDoc.svelte'
    import PositionDoc from '$lib/doc/badge/PositionDoc.svelte'
    import PtDoc from '$lib/doc/badge/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/badge/pt/Wireframe.svelte'
    import SeverityDoc from '$lib/doc/badge/SeverityDoc.svelte'
    import SizeDoc from '$lib/doc/badge/SizeDoc.svelte'
    import StyledDoc from '$lib/doc/badge/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/badge/theming/TailwindDoc.svelte'
    import { projectName } from '$lib/doc/common/doc.utils'
    import DocApiTable from '$lib/doc/common/DocApiTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'

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
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'positioned',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'button',
            label: 'Button',
            component: ButtonDoc
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
            id: 'pt.badge.options',
            label: 'Badge PT Options',
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
    title="{projectName} Badge Component"
    header="Badge"
    description="Badge is a small status indicator for another element."
    componentDocs={docs}
    apiDocs={['Badge']}
    {ptDocs}
    {themingDocs}
/>;

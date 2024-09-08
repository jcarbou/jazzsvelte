<script lang="ts">
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import ButtonDoc from './ButtonDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import PositionDoc from './PositionDoc.svelte'
    import PtDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import SeverityDoc from './SeverityDoc.svelte'
    import SizeDoc from './SizeDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { projectName } from '../common/doc.utils'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import { badgeApiData } from '@jazzsvelte/badge'
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
    title="{projectName} Badge Component"
    header="Badge"
    description="Badge is a small status indicator for another element."
    apiDocData={[badgeApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>;

<script lang="ts">
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import CircleDoc from './CircleDoc.svelte'
    import CustomDoc from './CustomDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import LinearDoc from './LinearDoc.svelte'
    import MaskDoc from './MaskDoc.svelte'
    import PTDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import QuarterCircleDoc from './QuarterCircleDoc.svelte'
    import SemiCircleDoc from './SemiCircleDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import TooltipDoc from './TooltipDoc.svelte'
    import { speedDialApiData } from '@jazzsvelte/speed_dial'
    import type { Doc } from '../common/doc.types'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'linear',
            label: 'Linear',
            component: LinearDoc
        },
        {
            id: 'circle',
            label: 'Circle',
            component: CircleDoc
        },
        {
            id: 'semicircle',
            label: 'Semi Circle',
            component: SemiCircleDoc
        },
        {
            id: 'quartercircle',
            label: 'Quarter Circle',
            component: QuarterCircleDoc
        },
        {
            id: 'tooltip',
            label: 'Tooltip',
            component: TooltipDoc
        },
        {
            id: 'mask',
            label: 'Mask',
            component: MaskDoc
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
            id: 'pt.speeddial.options',
            label: 'SpeedDial PT Options',
            component: DocApiPtTable
        },
        {
            id: 'pt.demo',
            label: 'Example',
            component: PTDoc
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
    title="React Speed Dial Component"
    header="Speed Dial"
    description="SpeedDial is a floating button with a popup menu."
    apiDocData={[speedDialApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>;

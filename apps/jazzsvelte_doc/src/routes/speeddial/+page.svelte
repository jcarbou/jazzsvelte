<script lang="ts">
    import { apiDataToDocs } from '$lib/doc/common/doc.utils'
    import DocApiPtTable from '$lib/doc/common/DocApiPtTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/speedDial/AccessibilityDoc.svelte'
    import CircleDoc from '$lib/doc/speedDial/CircleDoc.svelte'
    import CustomDoc from '$lib/doc/speedDial/CustomDoc.svelte'
    import ImportDoc from '$lib/doc/speedDial/ImportDoc.svelte'
    import LinearDoc from '$lib/doc/speedDial/LinearDoc.svelte'
    import MaskDoc from '$lib/doc/speedDial/MaskDoc.svelte'
    import PTDoc from '$lib/doc/speedDial/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/speedDial/pt/Wireframe.svelte'
    import QuarterCircleDoc from '$lib/doc/speedDial/QuarterCircleDoc.svelte'
    import SemiCircleDoc from '$lib/doc/speedDial/SemiCircleDoc.svelte'
    import StyledDoc from '$lib/doc/speedDial/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/speedDial/theming/TailwindDoc.svelte'
    import TooltipDoc from '$lib/doc/speedDial/TooltipDoc.svelte'
    import { speedDialApiData } from '@jazzsvelte/speed_dial'
    import { setContext } from 'svelte'

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

    setContext('apiData', speedDialApiData)
</script>

<DocComponent
    title="React Speed Dial Component"
    header="Speed Dial"
    description="SpeedDial is a floating button with a popup menu."
    componentDocs={docs}
    apiDocs={[apiDataToDocs(speedDialApiData)]}
    {ptDocs}
    {themingDocs}
/>;

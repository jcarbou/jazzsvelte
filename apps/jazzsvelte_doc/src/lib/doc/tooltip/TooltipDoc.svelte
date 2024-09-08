<script lang="ts">
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import AutohideDoc from './AutohideDoc.svelte'
    import DelayDoc from './DelayDoc.svelte'
    import DisabledDoc from './DisabledDoc.svelte'
    import EventDoc from './EventDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import MousetrackDoc from './MousetrackDoc.svelte'
    import PositionDoc from './PositionDoc.svelte'
    import PtDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import ReactiveDoc from './ReactiveDoc.svelte'
    import TargetDoc from './TargetDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { tooltipApiData } from '@jazzsvelte/tooltip'
    import type { Doc } from '../common/doc.types'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'event',
            label: 'Event',
            component: EventDoc
        },
        {
            id: 'autohide',
            label: 'Auto Hide',
            component: AutohideDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'target',
            label: 'Target',
            component: TargetDoc
        },
        {
            id: 'mousetrack',
            label: 'Mouse Track',
            component: MousetrackDoc
        },
        {
            id: 'reactive',
            label: 'Reactive',
            component: ReactiveDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
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
            id: 'pt.tooltip.options',
            label: 'Tooltip PT Options',
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
    title="React Tooltip Component"
    header="Tooltip"
    description="Tooltip functionality is integrated within various PrimeReact components."
    apiDocData={[tooltipApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>

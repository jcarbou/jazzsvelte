<script lang="ts">
    import DocApiTable from '$lib/doc/common/DocApiTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/tooltip/AccessibilityDoc.svelte'
    import AutohideDoc from '$lib/doc/tooltip/AutohideDoc.svelte'
    import DelayDoc from '$lib/doc/tooltip/DelayDoc.svelte'
    import DisabledDoc from '$lib/doc/tooltip/DisabledDoc.svelte'
    import EventDoc from '$lib/doc/tooltip/EventDoc.svelte'
    import ImportDoc from '$lib/doc/tooltip/ImportDoc.svelte'
    import MousetrackDoc from '$lib/doc/tooltip/MousetrackDoc.svelte'
    import PositionDoc from '$lib/doc/tooltip/PositionDoc.svelte'
    import PtDoc from '$lib/doc/tooltip/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/tooltip/pt/Wireframe.svelte'
    import ReactiveDoc from '$lib/doc/tooltip/ReactiveDoc.svelte'
    import TargetDoc from '$lib/doc/tooltip/TargetDoc.svelte'
    import TemplateDoc from '$lib/doc/tooltip/TemplateDoc.svelte'
    import StyledDoc from '$lib/doc/tooltip/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/tooltip/theming/TailwindDoc.svelte'

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
    title="React Tooltip Component"
    header="Tooltip"
    description="Tooltip functionality is integrated within various PrimeReact components."
    componentDocs={docs}
    oldApiDocs={['Tooltip', 'TooltipOptions']}
    {ptDocs}
    {themingDocs}
/>

<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { virtualScrollerApiData } from '@jazzsvelte/virtual_scroller'
    import DocApiTable from '../common/DocApiTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import DelayDoc from './DelayDoc.svelte'
    import GridDoc from './GridDoc.svelte'
    import HorizontalDoc from './HorizontalDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import LazyDoc from './LazyDoc.svelte'
    import LoadingDoc from './LoadingDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import type { Doc } from '../common/doc.types'

    const docs: Doc[] = [
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
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
        },
        {
            id: 'grid',
            label: 'Grid',
            component: GridDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc
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
            id: 'pt.virtualscroller.options',
            label: 'VirtualScroller PT Options',
            component: DocApiPtTable
        }
    ]

    const themingDocs = [
        {
            id: 'styled',
            label: 'Styled',
            component: StyledDoc
        }
    ]
</script>

<DocComponent
    title="{projectName} Virtual Scroller Component"
    header="VirtualScroller"
    description="VirtualScroller is a performant approach to render large amounts of data efficiently."
    {docs}
    apiDocData={[virtualScrollerApiData]}
    {ptDocs}
    {themingDocs}
/>

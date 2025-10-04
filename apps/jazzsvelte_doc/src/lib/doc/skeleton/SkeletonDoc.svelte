<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { skeletonApiData } from '@jazzsvelte/skeleton'
    import DocApiTable from '../common/DocApiTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import CardDoc from './CardDoc.svelte'
    //import DataTableDoc from './DataTableDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import ListDoc from './ListDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import ShapesDoc from './ShapesDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'shapes',
            label: 'Shapes',
            component: ShapesDoc
        },
        {
            id: 'card',
            label: 'Card',
            component: CardDoc
        },
        {
            id: 'list',
            label: 'List',
            component: ListDoc
        },
        /* {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        },*/
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
            id: 'pt.skeleton.options',
            label: 'Skeleton PT Options',
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
    title="{projectName} Skeleton Component"
    header="Skeleton"
    description="Skeleton is a placeholder to display instead of the actual content."
    {docs}
    apiDocData={[skeletonApiData]}
    {ptDocs}
    {themingDocs}
/>;

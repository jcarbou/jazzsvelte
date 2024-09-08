<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { splitButtonApiData } from '@jazzsvelte/split_button'
    import DocApiTable from '../common/DocApiTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import DisabledDoc from './DisabledDoc.svelte'
    import IconsDoc from './IconsDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import LoadingDoc from './LoadingDoc.svelte'
    import OutlinedDoc from './OutlinedDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import RaisedDoc from './RaisedDoc.svelte'
    import RaisedTextDoc from './RaisedTextDoc.svelte'
    import RoundedDoc from './RoundedDoc.svelte'
    import SeverityDoc from './SeverityDoc.svelte'
    import SizesDoc from './SizesDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import TextDoc from './TextDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'

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
            id: 'icons',
            label: 'Icons',
            component: IconsDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'raised',
            label: 'Raised',
            component: RaisedDoc
        },
        {
            id: 'rounded',
            label: 'Rounded',
            component: RoundedDoc
        },
        {
            id: 'text',
            label: 'Text',
            component: TextDoc
        },
        {
            id: 'raisedtext',
            label: 'Raised Text',
            component: RaisedTextDoc
        },
        {
            id: 'outlinedbuttons',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
            id: 'pt.splitbutton.options',
            label: 'SplitButton PT Options',
            component: DocApiTable
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
    title="{projectName} SplitButton Component"
    header="SplitButton"
    description="SplitButton groups a set of commands in an overlay with a default action item."
    {docs}
    apiDocData={[splitButtonApiData]}
    {ptDocs}
    {themingDocs}
/>

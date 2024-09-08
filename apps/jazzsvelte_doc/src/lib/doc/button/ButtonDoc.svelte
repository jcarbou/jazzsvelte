<script lang="ts">
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BadgesDoc from './BadgesDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import DisabledDoc from './DisabledDoc.svelte'
    import IcononlyDoc from './IcononlyDoc.svelte'
    import IconsDoc from './IconsDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import LinkDoc from './LinkDoc.svelte'
    import LoadingDoc from './LoadingDoc.svelte'
    import OutlinedDoc from './OutlinedDoc.svelte'
    import PtDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import RaisedDoc from './RaisedDoc.svelte'
    import RaisedtextDoc from './RaisedtextDoc.svelte'
    import RoundedDoc from './RoundedDoc.svelte'
    import SeverityDoc from './SeverityDoc.svelte'
    import SizesDoc from './SizesDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import TextDoc from './TextDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { projectName } from '../common/doc.utils'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import { buttonApiData } from '@jazzsvelte/button'
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
            id: 'link',
            label: 'Link',
            component: LinkDoc
        },
        {
            id: 'icons',
            label: 'Icons',
            component: IconsDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
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
            component: RaisedtextDoc
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'icononly',
            label: 'Icon Only',
            component: IcononlyDoc
        },
        {
            id: 'badges',
            label: 'Badges',
            component: BadgesDoc
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
            id: 'pt.button.options',
            label: 'Button PT Options',
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
    title="{projectName} Button Component"
    header="Button"
    description="Button is an extension to standard input element with icons and theming."
    apiDocData={[buttonApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>

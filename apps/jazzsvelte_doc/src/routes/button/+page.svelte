<script lang="ts">
    import AccessibilityDoc from '$lib/doc/button/AccessibilityDoc.svelte'
    import BadgesDoc from '$lib/doc/button/BadgesDoc.svelte'
    import BasicDoc from '$lib/doc/button/BasicDoc.svelte'
    import DisabledDoc from '$lib/doc/button/DisabledDoc.svelte'
    import IcononlyDoc from '$lib/doc/button/IcononlyDoc.svelte'
    import IconsDoc from '$lib/doc/button/IconsDoc.svelte'
    import ImportDoc from '$lib/doc/button/ImportDoc.svelte'
    import LinkDoc from '$lib/doc/button/LinkDoc.svelte'
    import LoadingDoc from '$lib/doc/button/LoadingDoc.svelte'
    import OutlinedDoc from '$lib/doc/button/OutlinedDoc.svelte'
    import PtDoc from '$lib/doc/button/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/button/pt/Wireframe.svelte'
    import RaisedDoc from '$lib/doc/button/RaisedDoc.svelte'
    import RaisedtextDoc from '$lib/doc/button/RaisedtextDoc.svelte'
    import RoundedDoc from '$lib/doc/button/RoundedDoc.svelte'
    import SeverityDoc from '$lib/doc/button/SeverityDoc.svelte'
    import SizesDoc from '$lib/doc/button/SizesDoc.svelte'
    import TemplateDoc from '$lib/doc/button/TemplateDoc.svelte'
    import TextDoc from '$lib/doc/button/TextDoc.svelte'
    import StyledDoc from '$lib/doc/button/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/button/theming/TailwindDoc.svelte'
    import { apiDataToDocs, projectName } from '$lib/doc/common/doc.utils'
    import DocApiPtTable from '$lib/doc/common/DocApiPtTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import { buttonApiData } from '@jazzsvelte/button'

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
    componentDocs={docs}
    apiDocs={[apiDataToDocs(buttonApiData)]}
    {ptDocs}
    {themingDocs}
/>

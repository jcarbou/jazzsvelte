<script lang="ts">
    import { apiDataToDocs } from '$lib/doc/common/doc.utils'
    import DocApiPtTable from '$lib/doc/common/DocApiPtTable.svelte'
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/tieredMenu/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/tieredMenu/BasicDoc.svelte'
    import CommandDoc from '$lib/doc/tieredMenu/CommandDoc.svelte'
    import ImportDoc from '$lib/doc/tieredMenu/ImportDoc.svelte'
    import PopupDoc from '$lib/doc/tieredMenu/PopupDoc.svelte'
    import Wireframe from '$lib/doc/tieredMenu/pt/Wireframe.svelte'
    import RouterDoc from '$lib/doc/tieredMenu/RouterDoc.svelte'
    import TemplateDoc from '$lib/doc/tieredMenu/TemplateDoc.svelte'
    import StyledDoc from '$lib/doc/tieredMenu/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/tieredMenu/theming/TailwindDoc.svelte'
    import { tieredMenuApiData } from '@jazzsvelte/tiered_menu'
    import { setContext } from 'svelte'

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
            id: 'popup',
            label: 'Popup',
            component: PopupDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc
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
            id: 'pt.tieredmenu.options',
            label: 'TieredMenu PT Options',
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

    setContext('apiData', tieredMenuApiData)
</script>

<DocComponent
    title="React TieredMenu Component"
    header="TieredMenu"
    description="TieredMenu displays submenus in nested overlays."
    componentDocs={docs}
    apiDocs={[apiDataToDocs(tieredMenuApiData)]}
    {ptDocs}
    {themingDocs}
/>;

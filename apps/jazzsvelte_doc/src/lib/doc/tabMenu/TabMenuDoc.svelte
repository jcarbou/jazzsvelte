<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { tabMenuApiData } from '@jazzsvelte/tab_menu'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import CommandDoc from './CommandDoc.svelte'
    import ControlledDoc from './ControlledDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import RouterDoc from './RouterDoc.svelte'
    import TemplateDoc from './TemplateDoc.svelte'
    import ItemTemplateDoc from './ItemTemplateDoc.svelte'
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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'itemTemplate',
            label: 'Item Template',
            component: ItemTemplateDoc
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
            id: 'pt.tabmenu.options',
            label: 'TabMenu PT Options',
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
    title="{projectName} TabMenu Component"
    header="TabMenu"
    description="TabMenu is a navigation component that displays menu items as tab headers."
    {docs}
    apiDocData={[tabMenuApiData]}
    {ptDocs}
    {themingDocs}
/>

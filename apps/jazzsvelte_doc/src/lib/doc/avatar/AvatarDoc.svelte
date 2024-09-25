<script lang="ts">
    import { projectName } from '../common/doc.utils'
    import { avatarApiData } from '@jazzsvelte/avatar'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import GroupDoc from './GroupDoc.svelte'
    import IconDoc from './IconDoc.svelte'
    import ImageDoc from './ImageDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import LabelDoc from './LabelDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import DocApiTable from '../common/DocApiTable.svelte'
    import DocComponent from '../common/DocComponent.svelte'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
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
            id: 'pt.avatar.options',
            label: 'Avatar PT Options',
            component: DocApiTable
        },
        {
            id: 'pt.avatargroup.options',
            label: 'AvatarGroup PT Options',
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
    title="{projectName} Avatar Component"
    header="Avatar"
    description="Avatar represents people using icons, labels and images."
    {docs}
    apiDocData={[avatarApiData]}
    {ptDocs}
    {themingDocs}
/>;

<script lang="ts">
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import ConfigurationDoc from './ConfigurationDoc.svelte'
    import CustomDoc from './CustomDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { JAZZ_SVELTE } from '@jazzsvelte/api'
    import { projectName } from '../common/doc.utils'
    import { rippleApiData } from '@jazzsvelte/ripple'
    import type { Doc } from '../common/doc.types'

    const docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'configuration',
            label: 'ConfigurationDoc',
            component: ConfigurationDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ]
    JAZZ_SVELTE.ripple.set(true)

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
    title="{projectName} Ripple Component"
    header="Ripple"
    description="Ripple component adds ripple effect to the host element."
    apiDocData={[rippleApiData]}
    {docs}
    {themingDocs}
/>

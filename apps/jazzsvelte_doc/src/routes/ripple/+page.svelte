<script lang="ts">
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/ripple/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/ripple/BasicDoc.svelte'
    import ConfigurationDoc from '$lib/doc/ripple/ConfigurationDoc.svelte'
    import CustomDoc from '$lib/doc/ripple/CustomDoc.svelte'
    import ImportDoc from '$lib/doc/ripple/ImportDoc.svelte'
    import StyledDoc from '$lib/doc/ripple/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/ripple/theming/TailwindDoc.svelte'
    import { JAZZ_SVELTE } from '@jazzsvelte/api'
    import { apiDataToDocs, projectName } from '$lib/doc/common/doc.utils'
    import { rippleApiData } from '@jazzsvelte/ripple'

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
    componentDocs={docs}
    apiDocs={[apiDataToDocs(rippleApiData)]}
    {themingDocs}
/>

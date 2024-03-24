<script lang="ts">
    import DocComponent from '$lib/doc/common/DocComponent.svelte'
    import AccessibilityDoc from '$lib/doc/ripple/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/ripple/BasicDoc.svelte'
    import ConfigurationDoc from '$lib/doc/ripple/ConfigurationDoc.svelte'
    import CustomDoc from '$lib/doc/ripple/CustomDoc.svelte'
    import ImportDoc from '$lib/doc/ripple/ImportDoc.svelte'
    import StyledDoc from '$lib/doc/ripple/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/ripple/TailwindDoc.svelte'
    import PrimeReactContext from '$lib/components/api/PrimeReactContext.svelte'
import { useContext, useEffect, useRef } from 'react';

</script>
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
    ];
    const { ripple, setRipple } = useContext(PrimeReactContext);
    const userRippleValue = useRef(ripple);

    useEffect(() => {
        setRipple(true);

        const currentRipple = userRippleValue.current;
            setRipple(currentRipple);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    ];<DocComponent title="React Ripple Component" header="Ripple" description="Ripple component adds ripple effect to the host element." componentDocs={docs} apiDocs={['Ripple']} themingDocs={themingDocs} />;




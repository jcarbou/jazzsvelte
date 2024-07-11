<script lang="ts">
    import { apiDataToDocs } from '$lib/doc/common/doc.utils'
    import DocApiTable from '$lib/doc/common/DocApiTable.svelte'

    import DocComponent from '$lib/doc/common/DocComponent.svelte'

    import AccessibilityDoc from '$lib/doc/inputText/AccessibilityDoc.svelte'
    import BasicDoc from '$lib/doc/inputText/BasicDoc.svelte'
    import DisabledDoc from '$lib/doc/inputText/DisabledDoc.svelte'
    import FloatlabelDoc from '$lib/doc/inputText/FloatlabelDoc.svelte'
    //    import FormikDoc from '$lib/doc/inputText/form/FormikDoc.svelte'
    //import HookformDoc from '$lib/doc/inputText/form/HookformDoc.svelte'
    import HelptextDoc from '$lib/doc/inputText/HelptextDoc.svelte'
    import IconsDoc from '$lib/doc/inputText/IconsDoc.svelte'
    import ImportDoc from '$lib/doc/inputText/ImportDoc.svelte'
    import InvalidDoc from '$lib/doc/inputText/InvalidDoc.svelte'
    import KeyfilterDoc from '$lib/doc/inputText/KeyfilterDoc.svelte'
    import PtDoc from '$lib/doc/inputText/pt/PtDoc.svelte'
    import Wireframe from '$lib/doc/inputText/pt/Wireframe.svelte'
    import SizesDoc from '$lib/doc/inputText/SizesDoc.svelte'
    import StyledDoc from '$lib/doc/inputText/theming/StyledDoc.svelte'
    import TailwindDoc from '$lib/doc/inputText/theming/TailwindDoc.svelte'
    import { inputTextApiData } from '@jazzsvelte/input_text'

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
            id: 'keyfilter',
            label: 'Key Filter',
            component: KeyfilterDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'helptext',
            label: 'Help Text',
            component: HelptextDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        /*{
            id: 'form',
            label: 'Form',
            description: 'Compatibility with popular React form libraries.',
            children: [
                {
                    id: 'formik',
                    label: 'Formik',
                    component: FormikDoc
                },
                {
                    id: 'hookform',
                    label: 'Hook Form',
                    component: HookformDoc
                }
            ]
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
            id: 'pt.inputtext.options',
            label: 'InputText PT Options',
            component: DocApiTable
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
    title="React Input Component"
    header="InputText"
    description="InputText is an extension to standard input element with theming and keyfiltering."
    componentDocs={docs}
    apiDocs={[apiDataToDocs(inputTextApiData)]}
    {ptDocs}
    {themingDocs}
/>

<script lang="ts">
    import DocComponent from '../common/DocComponent.svelte'
    import AccessibilityDoc from './AccessibilityDoc.svelte'
    import BasicDoc from './BasicDoc.svelte'
    import DisabledDoc from './DisabledDoc.svelte'
    import FloatlabelDoc from './FloatlabelDoc.svelte'
    //    import FormikDoc from './form/FormikDoc.svelte'
    //import HookformDoc from './form/HookformDoc.svelte'
    import HelptextDoc from './HelptextDoc.svelte'
    import IconsDoc from './IconsDoc.svelte'
    import ImportDoc from './ImportDoc.svelte'
    import InvalidDoc from './InvalidDoc.svelte'
    import VariantDoc from './VariantDoc.svelte'
    import KeyfilterDoc from './KeyfilterDoc.svelte'
    import PtDoc from './pt/PtDoc.svelte'
    import Wireframe from './pt/Wireframe.svelte'
    import SizesDoc from './SizesDoc.svelte'
    import StyledDoc from './theming/StyledDoc.svelte'
    import TailwindDoc from './theming/TailwindDoc.svelte'
    import { inputTextApiData } from '@jazzsvelte/input_text'
    import DocApiPtTable from '../common/DocApiPtTable.svelte'
    import type { Doc } from '../common/doc.types'

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
            id: 'variant',
            label: 'Filled',
            component: VariantDoc
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
    title="React Input Component"
    header="InputText"
    description="InputText is an extension to standard input element with theming and keyfiltering."
    apiDocData={[inputTextApiData]}
    {docs}
    {ptDocs}
    {themingDocs}
/>

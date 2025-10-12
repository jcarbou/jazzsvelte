<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {
    card: {
        root: {
            class: classs(
                'bg-white text-gray-700 shadow-md rounded-md', // Background, text color, box shadow, and border radius.
                'dark:bg-gray-900 dark:text-white ' //dark

        },
        body: 'p-5', // Padding.
        title: 'text-2xl font-bold mb-2', // Font size, font weight, and margin bottom.
        subtitle: {
            class: classs(
                'font-normal mb-2 text-gray-600', // Font weight, margin bottom, and text color.
                'dark:text-white/60 ' //dark

        },
        content: 'py-5', // Vertical padding.
        footer: 'pt-5' // Top padding.
    }

        `
    }

    const code2 = {
        javascript: `
${importJS('Card')}
import { Button } from 'primereact/button';

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />

    const footer = (
        <div class="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" severity="secondary" />
        </div>

        <div class="card flex justify-content-center">
            <Card title="Advanced Card" subTitle="Card Subtitle" footer={footer} header={header} class="md:w-25rem">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>

    `
    }
</script>

<DocSectionText {docSection}>
    <p>
        PrimeReact offers a built-in Tailwind theme to get you started quickly. The default values related to the component are
        displayed below. The component can easily be styled with your own design based on Tailwind utilities, see the{' '}
        <a href="/tailwind">Tailwind Customization</a> section for an example.
    </p>
    <DocSectionCode {code} hideToggleCode toImport hideStackBlitz />
    <p>A playground sample with the pre-built Tailwind theme.</p>
    <DocSectionCode code={code2} embedded />
</DocSectionText>

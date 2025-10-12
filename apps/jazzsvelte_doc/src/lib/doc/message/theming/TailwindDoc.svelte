<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {  
    message: {
        root: ({ props }) => ({
            class: classs('inline-flex items-center justify-center align-top', 'p-3 m-0 rounded-md', {
                'bg-blue-100 border-0 text-blue-700': props.severity == 'info',
                'bg-green-100 border-0 text-green-700': props.severity == 'success',
                'bg-orange-100 border-0 text-orange-700': props.severity == 'warn',
                'bg-red-100 border-0 text-red-700': props.severity == 'error'
            })
        }),
        icon: 'text-base mr-2'
    }

        `
    }

    const code2 = {
        javascript: `
${importJS('Message')}

        <div class="card flex flex-wrap items-center justify-center gap-3">
            <Message severity="info" text="Info Message" />
            <Message severity="success" text="Success Message" />
            <Message severity="warn" text="Warning Message" />
            <Message severity="error" text="Error Message" />
            <Message severity="secondary" text="Secondary Message" />
            <Message severity="contrast" text="Contrast Message" />
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

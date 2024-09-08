<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { dataJsCode, importCode } from '../data'

    export let docSection: DocSection

    const code = {
        basic: `
const TRANSITIONS = {
    overlay: {
        enterFromClass: 'opacity-0 scale-75',
        enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
        leaveActiveClass: 'transition-opacity duration-150 ease-linear',
        leaveToClass: 'opacity-0'
    }


const Tailwind = {  
    splitbutton: {
        root: ({ props }) => ({
            class: classs('inline-flex relative', 'rounded-md', { 'shadow-lg': props.raised })
        }),
        button: {
            root: ({ parent }) => ({
                class: classs('rounded-r-none border-r-0', { 'rounded-l-full': parent.props.rounded })
            }),
            icon: 'mr-2'
        },
        menu: {
            class: classs('outline-none', 'm-0 p-0 list-none')
        },
        menulist: 'relative',
        menubutton: {
            root: ({ parent }) => ({
                class: classs('rounded-l-none', { 'rounded-r-full': parent.props.rounded })
            }),
            label: 'hidden'
        }
    }

        `
    }

    const code2 = {
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}
<div class="card flex justify-content-center flex-wrap">
    <Toast ref={toast}></Toast>
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" class="mb-2" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" class="mb-2" />
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

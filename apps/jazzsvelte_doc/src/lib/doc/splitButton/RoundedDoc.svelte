<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SplitButton } from '@jazzsvelte/split_button'
    import { items, save, importCode, dataJsCode, dataTsCode } from './data'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" rounded />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" rounded />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" rounded />
</div>

        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" rounded />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Rounded buttons have a circular border radius.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" rounded />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" rounded />
</div>
<DocSectionCode {code} />

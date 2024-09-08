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
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" outlined />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" outlined />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" outlined />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" outlined />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Outlined buttons display a border without a background initially.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" outlined />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" outlined />
</div>
<DocSectionCode {code} />

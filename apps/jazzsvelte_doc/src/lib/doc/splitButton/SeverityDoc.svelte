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
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Severity defines the type of button.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="contrast" />
</div>
<DocSectionCode {code} />

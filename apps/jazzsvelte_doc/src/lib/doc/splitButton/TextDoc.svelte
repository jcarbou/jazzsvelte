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
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" text />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" text />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" text />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Text buttons are displayed as textual elements.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" text />
</div>
<DocSectionCode {code} />

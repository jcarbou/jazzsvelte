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
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" raised text />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" raised text />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" raised text />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" raised text />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Text buttons can be displayed as raised as well for elevation.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="secondary" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="success" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="info" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="warning" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="help" raised text />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} severity="danger" raised text />
</div>
<DocSectionCode {code} />

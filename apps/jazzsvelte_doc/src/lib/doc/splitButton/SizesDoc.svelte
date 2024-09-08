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
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="small" />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="large" />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="small" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="large" />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="small" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="large" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        SplitButton provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-3">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="small" />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} size="large" />
</div>
<DocSectionCode {code} />

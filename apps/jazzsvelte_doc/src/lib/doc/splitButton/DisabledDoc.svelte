<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SplitButton } from '@jazzsvelte/split_button'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { items, save, importCode, dataJsCode, dataTsCode } from './data'

    export let docSection: DocSection

    const code = {
        basic: `
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} disabled />
</div>
        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}
<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} disabled />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        When <i>disabled</i> is present, the element cannot be edited and focused.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} disabled />
</div>
<DocSectionCode {code} />

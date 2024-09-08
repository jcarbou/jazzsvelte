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
<SplitButton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" on:click={save} model={items} />
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" on:click={save} model={items} />
</div>
 `,
        typescript: `
${importJS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" on:click={save} model={items} />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        SplitButton has a default action button and a collection of additional options defined by the <i>model</i> property based on
        MenuModel API.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" on:click={save} model={items} />
</div>
<DocSectionCode {code} />

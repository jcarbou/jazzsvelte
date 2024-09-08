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
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
</div>

        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}
    
<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
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
    <SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} />
</div>
<DocSectionCode {code} />

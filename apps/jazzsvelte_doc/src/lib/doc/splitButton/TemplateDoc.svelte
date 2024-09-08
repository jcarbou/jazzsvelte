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
<SplitButton icon="pi pi-prime" model={items} severity="contrast">
    <span slot="buttonLabel">Jazz Svelte</span>
</SplitButton>
        `,
        javascript: `
${importJS('SplitButton', importCode, dataJsCode)}

<div class="card flex justify-content-center">
    <SplitButton icon="pi pi-prime" model={items} severity="contrast">
        <span slot="buttonLabel">Jazz Svelte</span>
    </SplitButton>
</div>

        `,
        typescript: `
${importTS('SplitButton', importCode, dataTsCode)}

<div class="card flex justify-content-center">
    <SplitButton icon="pi pi-prime" model={items} severity="contrast">
        <span slot="buttonLabel">Jazz Svelte</span>
    </SplitButton>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        SplitButton has a <i>label</i> and <i>icon</i> properties that allows to define the main button.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <SplitButton icon="pi pi-prime" model={items} severity="contrast">
        <span slot="buttonLabel">Jazz Svelte</span>
    </SplitButton>
</div>
<DocSectionCode {code} />

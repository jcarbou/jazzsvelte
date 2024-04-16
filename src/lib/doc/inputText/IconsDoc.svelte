<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'

    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText placeholder="Search" />
</span>

<span class="p-input-icon-right">
    <i class="pi pi-spin pi-spinner" />
    <InputText />
</span>
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText placeholder="Search" />
    </span>

    <span class="p-input-icon-right">
        <i class="pi pi-spin pi-spinner" />
        <InputText />
    </span>
</div>  </div>

        `,
        typescript: `
${importTS('InputText')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText placeholder="Search" />
    </span>

    <span class="p-input-icon-right">
        <i class="pi pi-spin pi-spinner" />
        <InputText />
    </span>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Icons can be placed inside an input element by wrapping both the input and the icon with an element that has either <i
            >.p-input-icon-left</i
        >
        or <i>p-input-icon-right</i> class.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText placeholder="Search" />
    </span>

    <span class="p-input-icon-right">
        <i class="pi pi-spin pi-spinner" />
        <InputText />
    </span>
</div>
<DocSectionCode {code} />

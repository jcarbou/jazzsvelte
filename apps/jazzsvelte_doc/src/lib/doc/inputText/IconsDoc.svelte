<script lang="ts">
    import { simpleCode } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['InputText'],
        `
<span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText placeholder="Search" />
</span>

<span class="p-input-icon-right">
    <i class="pi pi-spin pi-spinner" />
    <InputText />
</span>
`
    )
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

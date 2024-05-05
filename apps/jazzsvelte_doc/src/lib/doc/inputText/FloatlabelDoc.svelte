<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
    let value: string = ''

    const code = {
        basic: `
<span class="p-float-label">
    <InputText id="username" bind:value={value} />
    <label for="username">Username</label>
</span>
        `,
        javascript: `
${importJS('InputText', "let value = ''")}

<div class="card flex justify-content-center">
    <span class="p-float-label">
        <InputText id="username" bind:value={value} />
        <label for="username">Username</label>
    </span>
</div>
        `,
        typescript: `
${importTS('InputText', "let value : string = ''")}

<div class="card flex justify-content-center">
    <span class="p-float-label">
        <InputText id="username" bind:value={value} />
        <label for="username">Username</label>
    </span>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>A floating label appears on top of the input field when focused.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <InputText id="username" bind:value />
        <label for="username">Username</label>
    </span>
</div>
<DocSectionCode {code} />

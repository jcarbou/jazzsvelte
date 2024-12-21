<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
    let value = $state<string>('')

    const codesBasic = `
<span class="p-float-label">
    <InputText id="username" bind:value={value} />
    <label for="username">Username</label>
</span>
`
    const code = {
        basic: codesBasic,
        javascript: `
${importJS('InputText', "let value = $state('')")}
${codesBasic}
`,
        typescript: `
${importTS('InputText', "let value = $state<string>('')")}
${codesBasic}
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

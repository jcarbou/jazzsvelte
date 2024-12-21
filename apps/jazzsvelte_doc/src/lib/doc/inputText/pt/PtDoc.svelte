<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    let { docSection }: ComponentDocProps = $props()

    let value: string = $state('')

    const codeBasic = `
<InputText
    bind:value={value}
    pt={{
        root: { class: 'border-primary-400' }
    }}
/>
`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS('InputText', "let value = $state('')")}
${codeBasic}
        `,
        typescript: `
${importTS('InputText', "let value = $state<string>('')")}
${codeBasic} `
    }
</script>

<DocSectionText {docSection}>
    <p>
        InputText is used as a controlled input with <i>value</i> and <i>onChange</i> properties.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText
        bind:value
        pt={{
            root: { class: 'border-primary-400' }
        }}
    />
</div>
<DocSectionCode {code} />

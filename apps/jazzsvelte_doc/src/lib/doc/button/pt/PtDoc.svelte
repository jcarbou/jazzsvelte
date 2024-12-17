<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '$lib/doc/common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<Button label="Submit" icon="pi pi-check"
    pt={{
        root: { class: 'bg-blue-500 border-blue-500' }
    }}
/>`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS('Button')}
${codeBasic}
`,
        typescript: `
${importTS('Button')}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection} />
<div class="card flex flex-wrap gap-3 justify-content-center">
    <Button
        label="Submit"
        icon="pi pi-check"
        pt={{
            root: { class: 'bg-blue-500 border-blue-500' }
        }}
    />
</div>
<DocSectionCode {code} />

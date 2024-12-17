<script lang="ts">
    import { importJS, importObject, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { showToastList } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    function showMultiple() {
        showToastList([
            { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 },
            { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 },
            { severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 }
        ])
    }

    const codeFn = `
function showMultiple() {
        showToastList([
            { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 },
            { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 },
            { severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 }
        ])
    }
`
    const codeButton = `
<Button onclick={showMultiple} label="Multiple" severity="warning" />
`

    const codeBasic = `
${importJS(['Button'], importObject('showToast', 'toast'), codeFn)}
${codeButton}
`
    const code = {
        basic: codeBasic
    }
</script>

<DocSectionText {docSection}>
    <p>
        Multiple messages are displayed by passing an array to the <i>show</i> method.
    </p>
</DocSectionText>
<div class="card flex justify-content-center gap-2">
    <Button onclick={showMultiple} label="Multiple" severity="warning" />
</div>
<DocSectionCode {code} />

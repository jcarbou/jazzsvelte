<script lang="ts">
    import { importObject, importComponent, importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    function showInfo() {
        showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
    }

    const codeFn = `
function showInfo() {
        showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
    }
`
    const codeButton = `
<Button onclick={showInfo} label="Show" />
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
        Messages are displayed by calling the <i>showToast</i> method. A single message is specified by the Message interface that
        defines various properties such as <i>severity</i>, <i>summary</i> and{' '}
        <i>detail</i>. The <i>ToastMessage</i> is generated and displayed inside the <i>Toast</i> component. So the
        <i>Toast</i> component must be insetred in the main page of your application.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button onclick={showInfo} label="Show" />
</div>
<DocSectionCode {code} />

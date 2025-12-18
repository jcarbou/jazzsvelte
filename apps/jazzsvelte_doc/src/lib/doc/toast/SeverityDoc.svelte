<script lang="ts">
    import { importObject, importJS, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { showToast } from '@jazzsvelte/toast'
    import type { ToastSeverity } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    function showMessage(severity: ToastSeverity) {
        showToast({ severity, summary: severity[0].toUpperCase() + severity.substring(1), detail: 'Message Content', life: 3000 })
    }

    const codeButtons = `
<Button label="Success" class="p-button-success" onclick={showSuccess} />
<Button label="Info" class="p-button-info" onclick={showInfo} />
<Button label="Warn" class="p-button-warning" onclick={showWarn} />
<Button label="Error" class="p-button-danger" onclick={showError} />
`

    const code = {
        basic: codeButtons,
        javascript: `
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    `
    function showMessage(severity: ToastSeverity) {
        showToast({ severity, summary: severity[0].toUpperCase() + severity.substring(1), detail: 'Message Content', life: 3000 })
    }
`
)}
${codeButtons}
`,
        typescript: `
${importTS(
    ['Button'],
    importType('ToastSeverity', 'toast'),
    importObject('showToast', 'toast'),
    `
    function showMessage(severity) {
        showToast({ severity, summary: severity[0].toUpperCase() + severity.substring(1), detail: 'Message Content', life: 3000 })
    }
`
)}
${codeButtons}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>severity</i> option specifies the type of the message.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button label="Success" class="p-button-success" onclick={() => showMessage('success')} />
        <Button label="Info" class="p-button-info" onclick={() => showMessage('info')} />
        <Button label="Warn" class="p-button-warning" onclick={() => showMessage('warn')} />
        <Button label="Error" class="p-button-danger" onclick={() => showMessage('error')} />
    </div>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importObject, importJS, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'
    import type { ToastSeverity } from '@jazzsvelte/toast'

    export let docSection: DocSection

    function showMessage(severity: ToastSeverity) {
        showToast({ severity, summary: severity[0].toUpperCase() + severity.substring(1), detail: 'Message Content', life: 3000 })
    }

    const code = {
        basic: `
<Button label="Success" class="p-button-success" on:click={showSuccess} />
<Button label="Info" class="p-button-info" on:click={showInfo} />
<Button label="Warn" class="p-button-warning" on:click={showWarn} />
<Button label="Error" class="p-button-danger" on:click={showError} />
        `,
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
<Button label="Success" class="p-button-success" on:click={showSuccess} />
<Button label="Info" class="p-button-info" on:click={showInfo} />
<Button label="Warn" class="p-button-warning" on:click={showWarn} />
<Button label="Error" class="p-button-danger" on:click={showError} />
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
<Button label="Success" class="p-button-success" on:click={showSuccess} />
<Button label="Info" class="p-button-info" on:click={showInfo} />
<Button label="Warn" class="p-button-warning" on:click={showWarn} />
<Button label="Error" class="p-button-danger" on:click={showError} />
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
        <Button label="Success" class="p-button-success" on:click={() => showMessage('success')} />
        <Button label="Info" class="p-button-info" on:click={() => showMessage('info')} />
        <Button label="Warn" class="p-button-warning" on:click={() => showMessage('warn')} />
        <Button label="Error" class="p-button-danger" on:click={() => showMessage('error')} />
    </div>
</div>
<DocSectionCode {code} />

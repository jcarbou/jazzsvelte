<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'
    import type { ToastSeverity } from '@jazzsvelte/toast'

    export let docSection: DocSection

    function showMessage(toastId: string, summary: string, severity: ToastSeverity) {
        showToast({ toastId, severity, summary, detail: summary, life: 3000 })
    }

    const code = {
        basic: `
// Main page : Declare all required Toast
<Toast />
<Toast id="topLeft" position="top-left" />
<Toast id="topCenter" position="top-center" />
<Toast id="topRight" position="top-right" />
<Toast id="center" position="center" />
<Toast id="bottomLeft" position="bottom-left" />
<Toast id="bottomCenter" position="bottom-center" />
<Toast id="bottomRight" position="bottom-right" />

// Everywhere
function showMessage(toastId: string, summary: string, severity: ToastSeverity) {
   showToast({ toastId, severity, summary, detail: summary, life: 3000 })
}
        `,
        javascript: `
// Main page
${importJS('Toast')}

...
<Toast />
<Toast id="topLeft" position="top-left" />
<Toast id="topCenter" position="top-center" />
<Toast id="topRight" position="top-right" />
<Toast id="center" position="center" />
<Toast id="bottomLeft" position="bottom-left" />
<Toast id="bottomCenter" position="bottom-center" />
<Toast id="bottomRight" position="bottom-right" />

// Everywhere
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    `
    function showMessage(toastId: string, summary: string, severity) {
        showToast({ toastId, severity, summary, detail: summary, life: 3000 })
    }
`
)}

<Button label="Top Left" class="p-button-success" on:click={() => showMessage('topLeft', 'Top Left', 'success')} />
<Button label="Top Center" on:click={() => showMessage('topCenter','Top Center',  'info')} />
<Button label="Top Right" class="p-button-warning" on:click={() => showMessage('topRight', 'Top Right', 'warn')} />
<Button label="Center" class="p-button-danger" on:click={() => showMessage('center', 'Center', 'error')} />
<Button label="Bottom Left" class="p-button-success" on:click={() => showMessage('bottomLeft', 'Bottom Left',  'success')} />
<Button label="Bottom Center" on:click={() => showMessage('bottomCenter', 'Bottom Center',  'info')} />
<Button label="Bottom Right" class="p-button-warning" on:click={() => showMessage('bottomRight','Bottom Right',  'warn')} />
        `,
        typescript: `
// Main page
${importTS('Toast')}

...
<Toast />
<Toast id="topLeft" position="top-left" />
<Toast id="topCenter" position="top-center" />
<Toast id="topRight" position="top-right" />
<Toast id="center" position="center" />
<Toast id="bottomLeft" position="bottom-left" />
<Toast id="bottomCenter" position="bottom-center" />
<Toast id="bottomRight" position="bottom-right" />

// Everywhere
${importTS(
    ['Button'],
    importType('ToastSeverity', 'toast'),
    importObject('showToast', 'toast'),
    `
    function showMessage(toastId: string, summary: string, severity: ToastSeverity) {
        showToast({ toastId, severity, summary, detail: summary, life: 3000 })
    }
`
)}

<Button label="Top Left" class="p-button-success" on:click={() => showMessage('topLeft', 'Top Left', 'success')} />
<Button label="Top Center" on:click={() => showMessage('topCenter','Top Center',  'info')} />
<Button label="Top Right" class="p-button-warning" on:click={() => showMessage('topRight', 'Top Right', 'warn')} />
<Button label="Center" class="p-button-danger" on:click={() => showMessage('center', 'Center', 'error')} />
<Button label="Bottom Left" class="p-button-success" on:click={() => showMessage('bottomLeft', 'Bottom Left',  'success')} />
<Button label="Bottom Center" on:click={() => showMessage('bottomCenter', 'Bottom Center',  'info')} />
<Button label="Bottom Right" class="p-button-warning" on:click={() => showMessage('bottomRight','Bottom Right',  'warn')} />
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Location of the messages is customized with the <i>position</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button label="Top Left" class="p-button-success" on:click={() => showMessage('topLeft', 'Top Left', 'success')} />
        <Button label="Top Center" on:click={() => showMessage('topCenter', 'Top Center', 'info')} />
        <Button label="Top Right" class="p-button-warning" on:click={() => showMessage('topRight', 'Top Right', 'warn')} />
        <Button label="Center" class="p-button-danger" on:click={() => showMessage('center', 'Center', 'error')} />
        <Button
            label="Bottom Left"
            class="p-button-success"
            on:click={() => showMessage('bottomLeft', 'Bottom Left', 'success')}
        />
        <Button label="Bottom Center" on:click={() => showMessage('bottomCenter', 'Bottom Center', 'info')} />
        <Button
            label="Bottom Right"
            class="p-button-warning"
            on:click={() => showMessage('bottomRight', 'Bottom Right', 'warn')}
        />
    </div>
</div>
<DocSectionCode {code} />

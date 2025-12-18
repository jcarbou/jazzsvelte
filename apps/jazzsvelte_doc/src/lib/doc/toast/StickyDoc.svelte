<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'

    import type { ToastMessageStatus } from '@jazzsvelte/toast'
    import { closeToast, showToast } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    let toastMessage: ToastMessageStatus | null = null

    function showMessage() {
        toastMessage = showToast({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true })
    }

    function closeMessage() {
        closeToast(toastMessage)
        toastMessage = null
    }

    const code = {
        basic: `
let toastMessage: ToastMessageStatus | null = null

function showMessage() {
    toastMessage = showToast({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true })
}

function closeMessage() {
    closeToast(toastMessage)
    toastMessage = null
}
        `,
        javascript: `
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let toastMessage = null

    function showMessage() {
        toastMessage = showToast({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true })
    }

    function closeMessage() {
        closeToast(toastMessage)
        toastMessage = null
    }
`
)}

<Button onclick={showMessage} label="Sticky" />
<Button onclick={closeMessage} label="Clear" severity="secondary" />         
        `,
        typescript: `
${importTS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let toastMessage: ToastMessageStatus | null = null

    function showMessage() {
        toastMessage = showToast({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true })
    }

    function closeMessage() {
        closeToast(toastMessage)
        toastMessage = null
    }
`
)}

<Button onclick={showMessage} label="Sticky" />
<Button onclick={closeMessage} label="Clear" severity="secondary" />
         `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A message disappears after 3000ms defined the <i>life</i> option, set <i>sticky</i> option to display messages that do not
        hide automatically.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button onclick={showMessage} label="Sticky" />
        <Button onclick={closeMessage} label="Clear" severity="secondary" />
    </div>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { closeToast, showToast, type ToastMessageProps, type ToastMessageStatus, type ToastSnippet } from '@jazzsvelte/toast'
    import { Avatar } from '@jazzsvelte/avatar'

    export let docSection: DocSection

    let toastMessage: ToastMessageStatus | null = null

    function showMessage(customContent: ToastSnippet) {
        if (!toastMessage || toastMessage.isClosed) {
            toastMessage = showToast({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                customContent
            })
        }
    }

    function reply() {
        closeToast(toastMessage)
    }

    const codeSnippet = `
    <div class="flex flex-column align-items-start" style="flex:1;">
        <div class="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold text-900">Amy Elsner</span>
        </div>
        <div class="font-medium text-lg my-3 text-900">{summary}</div>
        <Button class="p-button-sm flex" label="Reply" severity="success" onclick={reply}></Button>
    </div>
`
    const codeButton = `
<Button onclick={() => showMessage(customContent)} label="Confirm" />
`
    const code = {
        basic: `
let toastMessage: ToastMessageStatus | null = null

function showMessage(customContent) {
    if (!toastMessage || toastMessage.isClosed) {
        toastMessage = showToast({
            severity: 'success',
            summary: 'Can you send me the report?',
            sticky: true,
            customContent
        })
    }
}
`,
        javascript: `
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let toastMessage = null

    function showMessage(customContent) {
        if (!toastMessage || toastMessage.isClosed) {
            toastMessage = showToast({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                customContent
            })
        }
    }

    function reply() {
        closeToast(toastMessage)
    }`
)}

{#snippet customContent({ summary })}
${codeSnippet}
{/snippet}
${codeButton}
`,
        typescript: `
// Parent
${importTS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let toastMessage: ToastMessageStatus | null = null

    function showMessage(customContent: ToastSnippet) {
        if (!toastMessage || toastMessage.isClosed) {
            toastMessage = showToast({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                customContent
            })
        }
    }

    function reply() {
        closeToast(toastMessage)
    }`
)}

{#snippet customContent({ summary }: ToastMessageProps)}
${codeSnippet}
{/snippet}
${codeButton}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content inside a message is defined with the <i>content</i> option.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    {#snippet customContent({ summary }: ToastMessageProps)}
        <div class="flex flex-column align-items-start" style="flex:1;">
            <div class="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold text-900">Amy Elsner</span>
            </div>
            <div class="font-medium text-lg my-3 text-900">{summary}</div>
            <Button class="p-button-sm flex" label="Reply" severity="success" onclick={reply}></Button>
        </div>
    {/snippet}

    <Button onclick={() => showMessage(customContent)} label="Confirm" />
</div>
<DocSectionCode {code} />

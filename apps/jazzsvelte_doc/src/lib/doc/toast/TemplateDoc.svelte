<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    // NOT_IMPLEMETED import Avatar from '$lib/components/avatar/Avatar.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import TemplateToastMessage from './TemplateToastMessage.svelte'
    import { closeToast, showToast, type ToastMessageStatus } from '@jazzsvelte/toast'

    export let docSection: DocSection

    let toastMessage: ToastMessageStatus | null = null

    function showMessage() {
        if (!toastMessage || toastMessage.isClosed) {
            toastMessage = showToast({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                customContent: TemplateToastMessage,
                customProps: {
                    reply: () => {
                        closeToast(toastMessage)
                    }
                }
            })
        }
    }

    const code = {
        basic: `
let toastMessage: ToastMessageStatus | null = null

function showMessage() {
    if (!toastMessage || toastMessage.isClosed) {
        toastMessage = showToast({
            severity: 'success',
            summary: 'Can you send me the report?',
            sticky: true,
            customContent: TemplateToastMessage,
            reply: () => {
                closeToast(toastMessage)
            }
        })
    }
}
`,
        javascript: `
// Parent
let toastMessage = null

function showMessage() {
    if (!toastMessage || toastMessage.isClosed) {
        toastMessage = showToast({
            severity: 'success',
            summary: 'Can you send me the report?',
            sticky: true,
            customContent: TemplateToastMessage,
            reply: () => {
                closeToast(toastMessage)
            }
        })
    }
}

// Content : TemplateToastMessage
${importJS(['Button'], 'export let summary: string | null = null', 'export let reply: () => void')}

<div class="flex flex-column align-items-start" style="flex:1;">
    <div class="flex align-items-center gap-2">
        <!-- NOT_IMPLEMENTED <Avatar image="/images/avatar/amyelsner.png" shape="circle" />-->
        <span class="font-bold text-900">Amy Elsner</span>
    </div>
    <div class="font-medium text-lg my-3 text-900">{summary}</div>
    <Button class="p-button-sm flex" label="Reply" severity="success" on:click={reply}></Button>
</div>
 `,
        typescript: `
// Parent
let toastMessage: ToastMessageStatus | null = null

function showMessage() {
    if (!toastMessage || toastMessage.isClosed) {
        toastMessage = showToast({
            severity: 'success',
            summary: 'Can you send me the report?',
            sticky: true,
            customContent: TemplateToastMessage,
            reply: () => {
                closeToast(toastMessage)
            }
        })
    }
}

// Content : TemplateToastMessage
${importJS(['Button'], 'export let summary: string | null = null', 'export let reply: () => void')}

<div class="flex flex-column align-items-start" style="flex:1;">
    <div class="flex align-items-center gap-2">
        <!-- NOT_IMPLEMENTED <Avatar image="/images/avatar/amyelsner.png" shape="circle" />-->
        <span class="font-bold text-900">Amy Elsner</span>
    </div>
    <div class="font-medium text-lg my-3 text-900">{summary}</div>
    <Button class="p-button-sm flex" label="Reply" severity="success" on:click={reply}></Button>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content inside a message is defined with the <i>content</i> option.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button on:click={showMessage} label="Confirm" />
</div>
<DocSectionCode {code} />

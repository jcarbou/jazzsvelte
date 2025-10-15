<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { Messages } from '@jazzsvelte/messages'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let messages: Messages

    function addMessages() {
        messages.showList([
            { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'info', summary: 'Info', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'error', summary: 'Error', detail: 'Message Content', sticky: true, closable: false }
        ])
    }

    const clearMessages = () => {
        messages.clear()
    }

    const codeDyna = `
    function addMessages() {
        messages.showList([
            { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'info', summary: 'Info', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', sticky: true, closable: false },
            { severity: 'error', summary: 'Error', detail: 'Message Content', sticky: true, closable: false }
        ])
    }

    const clearMessages = () => {
        messages.clear()
    }`
    const code = {
        basic: `
<Button type="button" onclick={addMessages} label="Show" class="mr-2" />
<Button type="button" onclick={clearMessages} label="Clear" class="p-button-secondary" />

<Messages bind:this={messages} />
        `,
        javascript: `
${importJS('Messages', `let messages${codeDyna}`)}

<Messages bind:this={messages} />
`,
        typescript: `
${importTS('Messages', `let messages: Messages${codeDyna}`)}

<Messages bind:this={messages} />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Multiple messages are displayed by passing an array to the <i>show</i> method.
    </p>
</DocSectionText>
<div class="card">
    <Button type="button" onclick={addMessages} label="Show" class="mr-2" />
    <Button type="button" onclick={clearMessages} label="Clear" class="p-button-secondary" />

    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

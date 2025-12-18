<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Messages } from '@jazzsvelte/messages'
    import type { ComponentDocProps } from '../common/doc.types'
    import { onMount } from 'svelte'

    let { docSection }: ComponentDocProps = $props()

    let messages: Messages

    onMount(() => {
        messages &&
            messages.showList([
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'secondary', summary: 'Secondary', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'contrast', summary: 'Contrast', detail: 'Message Content', closable: false }
            ])
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.showList([
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'secondary', summary: 'Secondary', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'contrast', summary: 'Contrast', detail: 'Message Content', closable: false }
            ])
    })`
    const code = {
        basic: `
 messages.showList([
    {sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false},
    {sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false},
    {sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false},
    {sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false}
    {sticky: true, severity: 'secondary', summary: 'Secondary', detail: 'Message Content', closable: false}
    {sticky: true, severity: 'contrast', summary: 'Contrast', detail: 'Message Content', closable: false}
])
        `,
        javascript: `
${importJS('Messages', `${codeImport}    let messages${codeOnMount}`)}

<Messages bind:this={messages} />
`,
        typescript: `
${importTS('Messages', `${codeImport}    let messages: Messages${codeOnMount}`)}

<Messages bind:this={messages} />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>severity</i> option specifies the type of the message.
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

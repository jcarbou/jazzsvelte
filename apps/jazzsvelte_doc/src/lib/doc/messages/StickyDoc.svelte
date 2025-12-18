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
                { sticky: true, life: 1000, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
                { sticky: true, life: 2000, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                { sticky: true, life: 3000, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false }
            ])
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.showList([
                { sticky: true, life: 1000, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
                { sticky: true, life: 2000, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                { sticky: true, life: 3000, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false }
            ])
    })`

    const code = {
        basic: `
msgs.current.show([
    { sticky: true, life: 1000, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
    { sticky: true, life: 2000, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
    { sticky: true, life: 3000, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
    { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false }
]);
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
        A message disappears after 3000ms defined the <i>life</i> option, set <i>sticky</i> option to displays message that do not
        hide automatically.
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

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
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Closable Message', closable: true },
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Not Closable Message', closable: false }
            ])
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.showList([
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Closable Message', closable: true },
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Not Closable Message', closable: false }
            ])
    })`
    const code = {
        basic: `
messages.showList([
    { sticky: true, severity: 'success', summary: 'Success', detail: 'Closable Message', closable: true },
    { sticky: true, severity: 'info', summary: 'Info', detail: 'Not Closable Message', closable: false }
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
        A message displays a close icon by default, <i>closable</i> option is used to control this behavior.
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

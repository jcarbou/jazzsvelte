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
            messages.show({
                sticky: true,
                severity: 'info',
                summary: 'Info',
                detail: 'Message Content',
                closable: false
            })
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.show({
                sticky: true,
                severity: 'info',
                summary: 'Info',
                detail: 'Message Content',
                closable: false
            })
    })`
    const code = {
        basic: `
<Messages bind:this={messages} />
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
        Messages are displayed by calling the <i>show</i> method provided by the component <i>ref</i>. A single message is
        specified by the Message interface that defines various properties such as <i>severity</i>, <i>summary</i> and{' '}
        <i>detail</i>
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

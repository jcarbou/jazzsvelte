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
                { sticky: true, severity: 'info', icon: 'pi pi-send', detail: 'Info message' },
                { severity: 'success', sticky: true, contentSnippet }
            ])
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.showList([
                { sticky: true, severity: 'info', icon: 'pi pi-send', detail: 'Info message' },
                { severity: 'success', sticky: true, contentSnippet }
            ])
    })`

    const codeSpippet = `
{#snippet contentSnippet()}
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" width="32" />
    <div class="ml-2">How may I help you?</div>
{/snippet}
`
    const code = {
        basic: `
messages.showList([
    { sticky: true, severity: 'info', icon: 'pi pi-send', detail: 'Info message' },
    { severity: 'success', sticky: true, contentSnippet }
])
 `,
        javascript: `
${importJS('Messages', `${codeImport}    let messages${codeOnMount}`)}

<Messages bind:this={messages} />
${codeSpippet}
`,
        typescript: `
${importTS('Messages', `${codeImport}    let messages: Messages${codeOnMount}`)}

<Messages bind:this={messages} />
${codeSpippet}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        A message with custom icon can be created by simply using <i>icon</i> or <i>content</i> options.
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

{#snippet contentSnippet()}
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" width="32" />
    <div class="ml-2">How may I help you?</div>
{/snippet}

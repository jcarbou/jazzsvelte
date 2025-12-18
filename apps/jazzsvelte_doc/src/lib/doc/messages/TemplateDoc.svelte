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
                severity: 'info',
                sticky: true,
                contentSnippet
            })
    })

    const codeImport = `import { onMount } from 'svelte'

`
    const codeOnMount = `
    onMount(() => {
        messages &&
            messages.show({
                severity: 'info',
                sticky: true,
                contentSnippet
            })
    })`
    const codeSnippet = `
{#snippet contentSnippet()}
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
    <div class="ml-2">Always bet on Prime.</div>
{/snippet}`
    const code = {
        basic: `
messages.show({
    severity: 'info',
    sticky: true,
    contentSnippet
})
...
${codeSnippet}
`,
        javascript: `
${importJS('Messages', `${codeImport}    let messages${codeOnMount}`)}

<Messages bind:this={messages} />
${codeSnippet}
`,
        typescript: `
${importTS('Messages', `${codeImport}    let messages: Messages${codeOnMount}`)}

<Messages bind:this={messages} />
${codeSnippet}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content inside a message is defined with the <i>content</i> option.
    </p>
</DocSectionText>
<div class="card">
    <Messages bind:this={messages} />
</div>
<DocSectionCode {code} />

{#snippet contentSnippet()}
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
    <div class="ml-2">Always bet on Prime.</div>
{/snippet}

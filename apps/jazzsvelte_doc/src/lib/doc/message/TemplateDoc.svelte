<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Message } from '@jazzsvelte/message'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Message
    style="border:solid #696cff; border-width: 0 0 0 6px; color: #696cff"
    class="border-primary w-full justify-content-start"
    severity="info"
> 
    {#snippet contentSnippet()}
        <div class="flex align-items-center">
            <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
            <div class="ml-2">Always bet on Prime.</div>
        </div>            
    {/snippet}
</Message>
        `,
        javascript: `
${importJS('Message')}

<div class="card">
    <Message
        style="border:solid #696cff; border-width: 0 0 0 6px; color: #696cff"
        class="border-primary w-full justify-content-start"
        severity="info"
    > 
        {#snippet contentSnippet()}
            <div class="flex align-items-center">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
                <div class="ml-2">Always bet on Prime.</div>
            </div>            
        {/snippet}
    </Message>
</div>
 `,
        typescript: `
${importTS('Message')}

<div class="card">
    <Message
        style="border:solid #696cff; border-width: 0 0 0 6px; color: #696cff"
        class="border-primary w-full justify-content-start"
        severity="info"
    > 
        {#snippet contentSnippet()}
            <div class="flex align-items-center">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
                <div class="ml-2">Always bet on Prime.</div>
            </div>            
        {/snippet}
    </Message>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content is displayed with the <i>content</i> property.
    </p>
</DocSectionText>
<div class="card">
    <Message
        style="border:solid #696cff; border-width: 0 0 0 6px; color: #696cff"
        class="border-primary w-full justify-content-start"
        severity="info"
    >
        {#snippet contentSnippet()}
            <div class="flex align-items-center">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
                <div class="ml-2">Always bet on Prime.</div>
            </div>
        {/snippet}
    </Message>
</div>
<DocSectionCode {code} />

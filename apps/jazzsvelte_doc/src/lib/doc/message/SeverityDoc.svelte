<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Message } from '@jazzsvelte/message'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Message severity="info" text="Info Message" />
<Message severity="success" text="Success Message" />
<Message severity="warn" text="Warning Message" />
<Message severity="error" text="Error Message" />
<Message severity="secondary" text="Secondary Message" />
<Message severity="contrast" text="Contrast Message" />
        `,
        javascript: `
${importJS('Message')}

<div class="card flex flex-wrap align-items-center justify-content-center gap-3">
    <Message severity="success" text="Success Message" />
    <Message severity="info" text="Info Message" />
    <Message severity="warn" text="Warning Message" />
    <Message severity="error" text="Error Message" />
    <Message severity="secondary" text="Secondary Message" />
    <Message severity="contrast" text="Contrast Message" />
</div>
`,
        typescript: `
${importTS('Message')}

<div class="card flex flex-wrap align-items-center justify-content-center gap-3">
    <Message severity="success" text="Success Message" />
    <Message severity="info" text="Info Message" />
    <Message severity="warn" text="Warning Message" />
    <Message severity="error" text="Error Message" />
    <Message severity="secondary" text="Secondary Message" />
    <Message severity="contrast" text="Contrast Message" />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>severity</i> property specifies the type of the message.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-3">
    <Message severity="success" text="Success Message" />
    <Message severity="info" text="Info Message" />
    <Message severity="warn" text="Warning Message" />
    <Message severity="error" text="Error Message" />
    <Message severity="secondary" text="Secondary Message" />
    <Message severity="contrast" text="Contrast Message" />
</div>
<DocSectionCode {code} />

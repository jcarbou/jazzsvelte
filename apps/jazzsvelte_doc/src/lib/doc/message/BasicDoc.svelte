<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Message } from '@jazzsvelte/message'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Message text="Username is required" />
        `,
        javascript: `
${importJS('Message')}

<div class="card flex justify-content-center">
    <Message text="Username is required" />
</div>
`,
        typescript: `
${importTS('Message')}

<div class="card flex justify-content-center">
    <Message text="Username is required" />
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Text to display is defined with the <i>text</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Message text="Username is required" />
</div>
<DocSectionCode {code} />

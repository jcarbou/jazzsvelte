<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import { Message } from '@jazzsvelte/message'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<div class="flex flex-wrap align-items-center mb-3 gap-2">
    <label htmlFor="username" class="p-sr-only">Username</label>
    <InputText id="username" placeholder="Username" class="p-invalid mr-2" />
    <Message severity="error" text="Username is required" />
</div>
<div class="flex flex-wrap align-items-center gap-2">
    <label htmlFor="email" class="p-sr-only">Email</label>
    <InputText id="email" placeholder="Email" class="p-invalid mr-2" />
    <Message severity="error" />
</div>
        `,
        javascript: `
${importJS(['Message', 'InputText'])}

<div class="card">
    <div class="flex flex-wrap align-items-center mb-3 gap-2">
        <label htmlFor="username" class="p-sr-only">Username</label>
        <InputText id="username" placeholder="Username" class="p-invalid mr-2" />
        <Message severity="error" text="Username is required" />
    </div>
    <div class="flex flex-wrap align-items-center gap-2">
        <label htmlFor="email" class="p-sr-only">Email</label>
        <InputText id="email" placeholder="Email" class="p-invalid mr-2" />
        <Message severity="error" />
    </div>
</div>
`,
        typescript: `
${importTS(['Message', 'InputText'])}

<div class="card">
    <div class="flex flex-wrap align-items-center mb-3 gap-2">
        <label for="username" class="p-sr-only">Username</label>
        <InputText id="username" placeholder="Username" class="p-invalid mr-2" />
        <Message severity="error" text="Username is required" />
    </div>
    <div class="flex flex-wrap align-items-center gap-2">
        <label for="email" class="p-sr-only">Email</label>
        <InputText id="email" placeholder="Email" class="p-invalid mr-2" />
        <Message severity="error" />
    </div>
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>Message component is handy when displaying error messages next to form elements.</p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap align-items-center mb-3 gap-2">
        <label for="username" class="p-sr-only"> Username </label>
        <InputText id="username" placeholder="Username" class="p-invalid mr-2" />
        <Message severity="error" text="Username is required" />
    </div>
    <div class="flex flex-wrap align-items-center gap-2">
        <label for="email" class="p-sr-only"> Email </label>
        <InputText id="email" placeholder="Email" class="p-invalid mr-2" />
        <Message severity="error" />
    </div>
</div>
<DocSectionCode {code} />

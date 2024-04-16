<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'

    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import InputText from '$lib/components/inputtext/InputText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
</div>
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
    </div>
</div>
        `,
        typescript: `
${importTS('InputText')}

<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
    </div>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        An advisory text can be defined with the semantic <i>small</i> tag.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
    </div>
</div>
<DocSectionCode {code} />

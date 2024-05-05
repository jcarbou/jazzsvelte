<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText class="p-invalid" />
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex justify-content-center">
    <InputText class="p-invalid" />
</div>
        `,
        typescript: `
${importTS('InputText')}

<div class="card flex justify-content-center">
    <InputText class="p-invalid" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Invalid state style is added using the <i>p-invalid</i> class to indicate a failed validation.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText class="p-invalid" />
</div>
<DocSectionCode {code} />

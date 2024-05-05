<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText disabled placeholder="Disabled" />
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex justify-content-center">
    <InputText disabled placeholder="Disabled" />
</div>

        `,
        typescript: `
${importTS('InputText')}

<div class="card flex justify-content-center">
    <InputText disabled placeholder="Disabled" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        When <i>disabled</i> is present, the element cannot be edited and focused.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText disabled placeholder="Disabled" />
</div>
<DocSectionCode {code} />

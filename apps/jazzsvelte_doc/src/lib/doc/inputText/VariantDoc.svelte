<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText variant="filled" />
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex justify-content-center">
    <InputText variant="filled" />
</div>
        `,
        typescript: `
${importTS('InputText')}

<div class="card flex justify-content-center">
    <InputText variant="filled" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the
        default <i>outlined</i> style.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText variant="filled" />
</div>
<DocSectionCode {code} />

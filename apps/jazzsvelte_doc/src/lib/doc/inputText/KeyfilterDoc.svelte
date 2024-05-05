<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText keyFilter="int" placeholder="Integers" />
        `,
        javascript: `
${importJS('InputText')}

<div class="card flex justify-content-center">
    <InputText keyFilter="int" placeholder="Integers" />
</div>
        `,
        typescript: `
${importTS('InputText')}

<div class="card flex justify-content-center">
    <InputText keyFilter="int" placeholder="Integers" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more
        information.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText keyFilter="int" placeholder="Integers" />
</div>
<DocSectionCode {code} />

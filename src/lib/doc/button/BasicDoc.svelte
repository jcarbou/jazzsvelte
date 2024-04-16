<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Submit" />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex justify-content-center">
    <Button label="Submit" />
</div>
        `,
        typescript: `
${importTS(`Button`)}

<div class="card flex justify-content-center">
    <Button label="Submit" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Text to display on a button is defined with the <i>label</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button label="Submit"></Button>
</div>
<DocSectionCode {code} />

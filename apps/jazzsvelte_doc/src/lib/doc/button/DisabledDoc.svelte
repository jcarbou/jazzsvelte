<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Submit" disabled />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex justify-content-center">
    <Button label="Submit" disabled />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex justify-content-center">
    <Button label="Submit" disabled />
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
    <Button label="Submit" disabled />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
        `,
        javascript: `
${importJS(['Button'])}

<div class="card flex justify-content-center">
    <Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
</div>
        `,
        typescript: `
${importTS(['Button'])}

<div class="card flex justify-content-center">
    <Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
</div>
<DocSectionCode {code} />

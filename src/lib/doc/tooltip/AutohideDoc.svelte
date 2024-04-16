<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
<InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
        `,
        javascript: `
${importJS(['InputText'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
    <InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
</div>
        `,
        typescript: `
${importTS(['InputText'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
    <InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set <i
            >autoHide</i
        > to false to change the default behavior.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
    <InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
        `,
        javascript: `
${importJS(['Button'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
</div>
        `,
        typescript: `
${importJS(['Button'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        When <i>mouseTrack</i> option is enabled, position of the Tooltip is updated according to the pointer coordinates.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button
        type="button"
        label="Save"
        icon="pi pi-check"
        tooltip="Save"
        tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
    />
</div>
<DocSectionCode {code} />

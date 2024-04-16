<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    import Tooltip from '$lib/components/tooltip/Tooltip.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />
        `,
        javascript: `
${importJS(['Button'])}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />
</div>
        `,
        typescript: `
${importTS(['Button'])}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Disabled elements do not trigger user interactions due to standard behavior. A common workaround for such cases is
        wrapping the disabled element with another element that has a tooltip attached. If the tooltip is built-in to the
        component then enable <i>showOnDisabled</i> option instead.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />
</div>
<DocSectionCode {code} />

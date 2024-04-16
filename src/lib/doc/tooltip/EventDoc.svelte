<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText type="text" placeholder="Hover" tooltip="Enter your username"/>
<InputText type="text" placeholder="Focus" tooltip="Enter your username" tooltipOptions={{ event: 'focus' }} />
<InputText type="text" placeholder="Both" tooltip="Enter your username" tooltipOptions={{ event: 'both' }} />
        `,
        javascript: `
${importJS(['InputText'])}

<div class="card flex justify-content-center gap-2">
    <InputText type="text" placeholder="Hover" tooltip="Enter your username"/>
    <InputText type="text" placeholder="Focus" tooltip="Enter your username" tooltipOptions={{ event: 'focus' }} />
    <InputText type="text" placeholder="Both" tooltip="Enter your username" tooltipOptions={{ event: 'both' }} />
</div>
        `,
        typescript: `
${importTS(['InputText'])}

<div class="card flex justify-content-center gap-2">
    <InputText type="text" placeholder="Hover" tooltip="Enter your username"/>
    <InputText type="text" placeholder="Focus" tooltip="Enter your username" tooltipOptions={{ event: 'focus' }} />
    <InputText type="text" placeholder="Both" tooltip="Enter your username" tooltipOptions={{ event: 'both' }} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Tooltip gets displayed on hover event by default, use the <i>event</i> option to set <i>focus</i> or <i>both</i> as alternatives.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <InputText type="text" placeholder="Hover" tooltip="Enter your username" />
    <InputText type="text" placeholder="Focus" tooltip="Enter your username" tooltipOptions={{ event: 'focus' }} />
    <InputText type="text" placeholder="Both" tooltip="Enter your username" tooltipOptions={{ event: 'both' }} />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText type="text" placeholder="Right" tooltip="Enter your username" />
<InputText type="text" placeholder="Top" tooltip="Enter your username" tooltipOptions={{ position: 'top' }} />
<InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
<InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
<InputText type="text" placeholder="Mouse" tooltip="Enter your username" tooltipOptions={{ position: 'mouse' }} />
        `,
        javascript: `
${importJS(['InputText'])}

<div class="card flex flex-wrap justify-content-center gap-2">
    <InputText type="text" placeholder="Right" tooltip="Enter your username" />
    <InputText type="text" placeholder="Top" tooltip="Enter your username" tooltipOptions={{ position: 'top' }} />
    <InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
    <InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
    <InputText type="text" placeholder="Mouse" tooltip="Enter your username" tooltipOptions={{ position: 'mouse' }} />
</div>
        `,
        typescript: `
${importTS(['InputText'])}

<div class="card flex flex-wrap justify-content-center gap-2">
    <InputText type="text" placeholder="Right" tooltip="Enter your username" />
    <InputText type="text" placeholder="Top" tooltip="Enter your username" tooltipOptions={{ position: 'top' }} />
    <InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
    <InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
    <InputText type="text" placeholder="Mouse" tooltip="Enter your username" tooltipOptions={{ position: 'mouse' }} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Form components have built-in support with the <i>tooltip</i> property and customizations like positioning is provided
        with <i>tooltipOptions</i>.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <InputText type="text" placeholder="Right" tooltip="Enter your username" />
    <InputText
        type="text"
        placeholder="Top"
        tooltip="Enter your username"
        tooltipOptions={{ position: 'top', closeOnEscape: true }}
    />
    <InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
    <InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
    <InputText type="text" placeholder="Mouse" tooltip="Enter your username" tooltipOptions={{ position: 'mouse' }} />
</div>
<DocSectionCode {code} />

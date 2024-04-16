<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<InputText
    type="text"
    tooltip="Enter your username"
    tooltipOptions={{
        pt: {
            text: {
                class: 'bg-orange-500'
            }
        }
    }}
/>
        `,
        javascript: `
${importJS(['InputText'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText
        type="text"
        tooltip="Enter your username"
        tooltipOptions={{
            pt: {
                text: {
                    class: 'bg-orange-500'
                }
            }
        }}
    />
</div>
        `,
        typescript: `
${importTS(['InputText'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText
        type="text"
        tooltip="Enter your username"
        tooltipOptions={{
            pt: {
                text: {
                    class: 'bg-orange-500'
                }
            }
        }}
    />
</div>
        `
    }
</script>

<DocSectionText {docSection} />
<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText
        type="text"
        tooltip="Enter your username"
        tooltipOptions={{
            pt: {
                text: {
                    class: 'bg-orange-500'
                }
            }
        }}
    />
</div>
<DocSectionCode {code} />

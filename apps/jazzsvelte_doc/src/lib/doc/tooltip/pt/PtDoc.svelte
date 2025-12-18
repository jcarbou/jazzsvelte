<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '../../common/DocSectionCode.svelte'
    import DocSectionText from '../../common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<InputText
    tooltip="Enter your username"
    tooltipOptions={{
        pt: {
            text: {
                class: 'bg-orange-500'
            }
        }
    }}
/>`

    const code = {
        basic: codeBasic,
        javascript: `
${importJS(['InputText'])}
${codeBasic}
`,
        typescript: `
${importTS(['InputText'])}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection} />
<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText
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

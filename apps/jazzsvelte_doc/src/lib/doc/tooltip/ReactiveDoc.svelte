<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} onclick={() => clickCount++} />
`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS(['Button'], 'let clickCount = $state(0)')}
${codeBasic}
`,
        typescript: `
${importTS(['Button'], 'let clickCount = $state<number>(0)')}
${codeBasic}
`
    }

    let clickCount = $state(0)
</script>

<DocSectionText {docSection}>
    <p>Tooltip content is reactive to reflect changes related to the target component.</p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} onclick={() => clickCount++} />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '$lib/doc/common/doc.utils'

    let { docSection }: ComponentDocProps = $props();

    const codeBasic = `
<Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
`

    const code = {
        basic: codeBasic,
        javascript: `
${importJS('Badge')}
${codeBasic}
`,
        typescript: `
${importTS('Badge')}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection} />
<div class="card flex justify-content-center">
    <Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props();
    
    const codeBasic = `
<Badge value="2"></Badge>
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

<DocSectionText {docSection}>
    <p>
        Text to display is defined with the <i>value</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Badge value="2"></Badge>
</div>
<DocSectionCode {code} />

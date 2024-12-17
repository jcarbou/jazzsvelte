<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<i class="pi pi-bell p-overlay-badge" style="font-size:2rem;">
    <Badge value="2"></Badge>
</i>
<i class="pi pi-calendar p-overlay-badge" style="font-size:2rem;">
    <Badge value="5+" severity="danger"></Badge>
</i>
<i class="pi pi-envelope p-overlay-badge" style="font-size:2rem;">
    <Badge severity="danger"></Badge>
</i>
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
        A Badge can be positioned at the top right corner of an element by adding <i>p-overlay-badge</i> style class to the element
        and embedding the badge inside.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-4">
    <i class="pi pi-bell p-overlay-badge" style="font-size:2rem;">
        <Badge value="2"></Badge>
    </i>
    <i class="pi pi-calendar p-overlay-badge" style="font-size:2rem;">
        <Badge value="5+" severity="danger"></Badge>
    </i>
    <i class="pi pi-envelope p-overlay-badge" style="font-size:2rem;">
        <Badge severity="danger"></Badge>
    </i>
</div>
<DocSectionCode {code} />

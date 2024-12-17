<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()
    const codeBasic = `
<Badge value="6" size="xlarge" severity="success"></Badge>
<Badge value="4" size="large" severity="warning"></Badge>
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
        Use the <i>size</i> property to customize the size of a Badge, currently <i>large</i> and <i>xlarge</i> are available as size
        options.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center align-items-end gap-2">
    <Badge value="6" size="xlarge" severity="success"></Badge>
    <Badge value="4" size="large" severity="warning"></Badge>
    <Badge value="2"></Badge>
</div>
<DocSectionCode {code} />

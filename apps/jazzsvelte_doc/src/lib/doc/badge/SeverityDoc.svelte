<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props();

    const codeBasic = `
<Badge value="2"></Badge>
<Badge value="8" severity="success"></Badge>
<Badge value="4" severity="info"></Badge>
<Badge value="12" severity="warning"></Badge>
<Badge value="3" severity="danger"></Badge>
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
        Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i>
        in addition to the default theme color.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Badge value="2"></Badge>
    <Badge value="8" severity="success"></Badge>
    <Badge value="4" severity="info"></Badge>
    <Badge value="12" severity="warning"></Badge>
    <Badge value="3" severity="danger"></Badge>
</div>
<DocSectionCode {code} />

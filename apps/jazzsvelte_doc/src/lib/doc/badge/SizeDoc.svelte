<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import { simpleCode } from '../common/doc.utils'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Badge'],
        `
<Badge value="6" size="xlarge" severity="success"></Badge>
<Badge value="4" size="large" severity="warning"></Badge>
<Badge value="2"></Badge>
`
    )
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

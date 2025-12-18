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
<Badge value="2"></Badge>
<Badge value="8" severity="success"></Badge>
<Badge value="4" severity="info"></Badge>
<Badge value="12" severity="warning"></Badge>
<Badge value="3" severity="danger"></Badge>
`
    )
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
    <Badge value="3" severity="secondary"></Badge>
    <Badge value="3" severity="contrast"></Badge>
</div>
<DocSectionCode {code} />

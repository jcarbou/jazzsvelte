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
`
    )
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

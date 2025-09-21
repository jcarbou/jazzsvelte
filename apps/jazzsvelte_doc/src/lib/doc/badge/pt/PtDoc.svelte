<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import { simpleCode } from '$lib/doc/common/doc.utils'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Badge'],
        `
<Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
`
    )
</script>

<DocSectionText {docSection} />
<div class="card flex justify-content-center">
    <Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
</div>
<DocSectionCode {code} />

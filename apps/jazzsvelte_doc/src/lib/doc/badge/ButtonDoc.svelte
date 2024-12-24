<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { simpleCode } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Badge', 'Button'],
        `
<Button type="button" label="Emails">
    <Badge value="8"></Badge>
</Button>
<Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
    <Badge value="8" severity="danger"></Badge>
</Button>
`
    )
</script>

<DocSectionText {docSection}>
    <p>Buttons have built-in support for badges to display a badge inline.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Button type="button" label="Emails">
        <Badge value="8"></Badge>
    </Button>
    <Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
        <Badge value="8" severity="danger"></Badge>
    </Button>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { simpleCode } from '$lib/doc/common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Button'],
        `
<Button label="Submit" icon="pi pi-check"
    pt={{
        root: { class: 'bg-blue-500 border-blue-500' }
    }}
/>
`
    )
</script>

<DocSectionText {docSection} />
<div class="card flex flex-wrap gap-3 justify-content-center">
    <Button
        label="Submit"
        icon="pi pi-check"
        pt={{
            root: { class: 'bg-blue-500 border-blue-500' }
        }}
    />
</div>
<DocSectionCode {code} />

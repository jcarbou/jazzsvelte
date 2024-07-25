<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} on:click={() => clickCount++} />
        `,
        javascript: `
${importJS(['Button'], 'let clickCount = 0')}

<Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} on:click={() => clickCount++} />
        `,
        typescript: `
${importTS(['Button'], 'let clickCount = 0')}

<Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} on:click={() => clickCount++} />
        `
    }

    let clickCount = 0
</script>

<DocSectionText {docSection}>
    <p>Tooltip content is reactive to reflect changes related to the target component.</p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Click Me !" icon="pi pi-check" tooltip={clickCount + ' Clicks'} on:click={() => clickCount++} />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'
    import { showToast } from '@jazzsvelte/toast'

    export let docSection: DocSection

    const code = {
        basic: `
        <Button label="Submit" on:click={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
        `,
        javascript: `
${importJS('Button', `import { showToast } from '@jazzsvelte/toast'`)}

<div class="card flex justify-content-center">
    <Button label="Submit" on:click={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
</div>
        `,
        typescript: `
${importTS(`Button`, `import { showToast } from '@jazzsvelte/toast'`)}

<div class="card flex justify-content-center">
    <Button label="Submit" on:click={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Text to display on a button is defined with the <i>label</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button label="Submit" on:click={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
</div>
<DocSectionCode {code} />

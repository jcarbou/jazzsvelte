<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    let loading = false

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }

    const code = {
        basic: `
<Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} />
        `,
        javascript: `
${importJS(
    'Button',
    `
    const loading = false

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }`
)}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} />
</div>
        `,
        typescript: `
${importTS(
    'Button',
    `
    const loading: boolean = false

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }`
)}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Busy state is controlled with the <i>loading</i> property.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" iconPos="right" icon="pi pi-check" {loading} on:click={load} />
</div>
<DocSectionCode {code} />

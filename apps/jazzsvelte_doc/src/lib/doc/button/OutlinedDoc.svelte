<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Primary" outlined />
<Button label="Secondary" severity="secondary" outlined />
<Button label="Success" severity="success" outlined />
<Button label="Info" severity="info" outlined />
<Button label="Warning" severity="warning" outlined />
<Button label="Help" severity="help" outlined />
<Button label="Danger" severity="danger" outlined />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" outlined />
    <Button label="Secondary" severity="secondary" outlined />
    <Button label="Success" severity="success" outlined />
    <Button label="Info" severity="info" outlined />
    <Button label="Warning" severity="warning" outlined />
    <Button label="Help" severity="help" outlined />
    <Button label="Danger" severity="danger" outlined />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" outlined />
    <Button label="Secondary" severity="secondary" outlined />
    <Button label="Success" severity="success" outlined />
    <Button label="Info" severity="info" outlined />
    <Button label="Warning" severity="warning" outlined />
    <Button label="Help" severity="help" outlined />
    <Button label="Danger" severity="danger" outlined />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Outlined buttons display a border without a background initially.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" outlined />
    <Button label="Secondary" severity="secondary" outlined />
    <Button label="Success" severity="success" outlined />
    <Button label="Info" severity="info" outlined />
    <Button label="Warning" severity="warning" outlined />
    <Button label="Help" severity="help" outlined />
    <Button label="Danger" severity="danger" outlined />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Primary" text raised />
<Button label="Secondary" severity="secondary" text raised />
<Button label="Success" severity="success" text raised />
<Button label="Info" severity="info" text raised />
<Button label="Warning" severity="warning" text raised />
<Button label="Help" severity="help" text raised />
<Button label="Danger" severity="danger" text raised />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text raised />
    <Button label="Secondary" severity="secondary" text raised />
    <Button label="Success" severity="success" text raised />
    <Button label="Info" severity="info" text raised />
    <Button label="Warning" severity="warning" text raised />
    <Button label="Help" severity="help" text raised />
    <Button label="Danger" severity="danger" text raised />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text raised />
    <Button label="Secondary" severity="secondary" text raised />
    <Button label="Success" severity="success" text raised />
    <Button label="Info" severity="info" text raised />
    <Button label="Warning" severity="warning" text raised />
    <Button label="Help" severity="help" text raised />
    <Button label="Danger" severity="danger" text raised />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Text buttons can be displayed as raised for elevation.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text raised />
    <Button label="Secondary" severity="secondary" text raised />
    <Button label="Success" severity="success" text raised />
    <Button label="Info" severity="info" text raised />
    <Button label="Warning" severity="warning" text raised />
    <Button label="Help" severity="help" text raised />
    <Button label="Danger" severity="danger" text raised />
    <Button label="Plain" plain text raised />
</div>
<DocSectionCode {code} />

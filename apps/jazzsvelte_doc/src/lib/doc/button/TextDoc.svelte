<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Primary" text />
<Button label="Secondary" severity="secondary" text />
<Button label="Success" severity="success" text />
<Button label="Info" severity="info" text />
<Button label="Warning" severity="warning" text />
<Button label="Help" severity="help" text />
<Button label="Danger" severity="danger" text />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text />
    <Button label="Secondary" severity="secondary" text />
    <Button label="Success" severity="success" text />
    <Button label="Info" severity="info" text />
    <Button label="Warning" severity="warning" text />
    <Button label="Help" severity="help" text />
    <Button label="Danger" severity="danger" text />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text />
    <Button label="Secondary" severity="secondary" text />
    <Button label="Success" severity="success" text />
    <Button label="Info" severity="info" text />
    <Button label="Warning" severity="warning" text />
    <Button label="Help" severity="help" text />
    <Button label="Danger" severity="danger" text />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Text buttons are displayed as textual elements.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" text />
    <Button label="Secondary" severity="secondary" text />
    <Button label="Success" severity="success" text />
    <Button label="Info" severity="info" text />
    <Button label="Warning" severity="warning" text />
    <Button label="Help" severity="help" text />
    <Button label="Danger" severity="danger" text />
    <Button label="Plain" plain text />
</div>
<DocSectionCode {code} />

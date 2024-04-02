<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Primary" raised />
<Button label="Secondary" severity="secondary" raised />
<Button label="Success" severity="success" raised />
<Button label="Info" severity="info" raised />
<Button label="Warning" severity="warning" raised />
<Button label="Help" severity="help" raised />
<Button label="Danger" severity="danger" raised />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" raised />
    <Button label="Secondary" severity="secondary" raised />
    <Button label="Success" severity="success" raised />
    <Button label="Info" severity="info" raised />
    <Button label="Warning" severity="warning" raised />
    <Button label="Help" severity="help" raised />
    <Button label="Danger" severity="danger" raised />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" raised />
    <Button label="Secondary" severity="secondary" raised />
    <Button label="Success" severity="success" raised />
    <Button label="Info" severity="info" raised />
    <Button label="Warning" severity="warning" raised />
    <Button label="Help" severity="help" raised />
    <Button label="Danger" severity="danger" raised />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Raised buttons display a shadow to indicate elevation.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" raised />
    <Button label="Secondary" severity="secondary" raised />
    <Button label="Success" severity="success" raised />
    <Button label="Info" severity="info" raised />
    <Button label="Warning" severity="warning" raised />
    <Button label="Help" severity="help" raised />
    <Button label="Danger" severity="danger" raised />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

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

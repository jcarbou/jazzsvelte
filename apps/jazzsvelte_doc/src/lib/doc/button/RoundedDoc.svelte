<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Button label="Primary" rounded />
<Button label="Secondary" severity="secondary" rounded />
<Button label="Success" severity="success" rounded />
<Button label="Info" severity="info" rounded />
<Button label="Warning" severity="warning" rounded />
<Button label="Help" severity="help" rounded />
<Button label="Danger" severity="danger" rounded />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" rounded />
    <Button label="Secondary" severity="secondary" rounded />
    <Button label="Success" severity="success" rounded />
    <Button label="Info" severity="info" rounded />
    <Button label="Warning" severity="warning" rounded />
    <Button label="Help" severity="help" rounded />
    <Button label="Danger" severity="danger" rounded />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" rounded />
    <Button label="Secondary" severity="secondary" rounded />
    <Button label="Success" severity="success" rounded />
    <Button label="Info" severity="info" rounded />
    <Button label="Warning" severity="warning" rounded />
    <Button label="Help" severity="help" rounded />
    <Button label="Danger" severity="danger" rounded />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Rounded buttons have a circular border radius.</p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Primary" rounded />
    <Button label="Secondary" severity="secondary" rounded />
    <Button label="Success" severity="success" rounded />
    <Button label="Info" severity="info" rounded />
    <Button label="Warning" severity="warning" rounded />
    <Button label="Help" severity="help" rounded />
    <Button label="Danger" severity="danger" rounded />
</div>
<DocSectionCode {code} />

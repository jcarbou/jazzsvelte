<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

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
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button label="Primary" rounded />
            <Button label="Secondary" severity="secondary" rounded />
            <Button label="Success" severity="success" rounded />
            <Button label="Info" severity="info" rounded />
            <Button label="Warning" severity="warning" rounded />
            <Button label="Help" severity="help" rounded />
            <Button label="Danger" severity="danger" rounded />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button label="Primary" rounded />
            <Button label="Secondary" severity="secondary" rounded />
            <Button label="Success" severity="success" rounded />
            <Button label="Info" severity="info" rounded />
            <Button label="Warning" severity="warning" rounded />
            <Button label="Help" severity="help" rounded />
            <Button label="Danger" severity="danger" rounded />
        </div>
    )

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

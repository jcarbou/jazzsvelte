<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button icon="pi pi-check" />
<Button label="Submit" icon="pi pi-check" />
<Button label="Submit" icon="pi pi-check" iconPos="right" />
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button icon="pi pi-check" />
    <Button label="Submit" icon="pi pi-check" />
    <Button label="Submit" icon="pi pi-check" iconPos="right" />
</div>
<DocSectionCode {code} />

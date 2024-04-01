<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Small" icon="pi pi-check" size="small" />
<Button label="Normal" icon="pi pi-check" />
<Button label="Large" icon="pi pi-check" size="large" />
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Button label="Small" icon="pi pi-check" size="small" />
            <Button label="Normal" icon="pi pi-check" />
            <Button label="Large" icon="pi pi-check" size="large" />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Button label="Small" icon="pi pi-check" size="small" />
            <Button label="Normal" icon="pi pi-check" />
            <Button label="Large" icon="pi pi-check" size="large" />
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Button provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-3">
    <Button label="Small" icon="pi pi-check" size="small" />
    <Button label="Normal" icon="pi pi-check" />
    <Button label="Large" icon="pi pi-check" size="large" />
</div>
<DocSectionCode {code} />

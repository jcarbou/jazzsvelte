<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<span class="p-buttonset">
    <Button label="Save" icon="pi pi-check" />
    <Button label="Delete" icon="pi pi-trash" />
    <Button label="Cancel" icon="pi pi-times" />
</span>
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex justify-content-center">
            <span class="p-buttonset">
                <Button label="Save" icon="pi pi-check" />
                <Button label="Delete" icon="pi pi-trash" />
                <Button label="Cancel" icon="pi pi-times" />
            </span>
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex justify-content-center">
            <span class="p-buttonset">
                <Button label="Save" icon="pi pi-check" />
                <Button label="Delete" icon="pi pi-trash" />
                <Button label="Cancel" icon="pi pi-times" />
            </span>
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Multiple buttons are grouped when wrapped inside an element with <i>p-buttonset</i> class.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <span class="p-buttonset">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Delete" icon="pi pi-trash" />
        <Button label="Cancel" icon="pi pi-times" />
    </span>
</div>
<DocSectionCode {code} />

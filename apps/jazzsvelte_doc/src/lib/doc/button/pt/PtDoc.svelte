<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Submit" icon="pi pi-check"
    pt={{
        root: { class: 'bg-blue-500 border-blue-500' }
    }}
/>
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap gap-3 justify-content-center">
            <Button
                label="Submit"
                icon="pi pi-check"
                pt={{
                    root: { class: 'bg-blue-500 border-blue-500' }
                }}
            />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap gap-3 justify-content-center">
            <Button
                label="Submit"
                icon="pi pi-check"
                pt={{
                    root: { class: 'bg-blue-500 border-blue-500' }
                }}
            />
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection} />
<div class="card flex flex-wrap gap-3 justify-content-center">
    <Button
        label="Submit"
        icon="pi pi-check"
        pt={{
            root: { class: 'bg-blue-500 border-blue-500' }
        }}
    />
</div>
<DocSectionCode {code} />

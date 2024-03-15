<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../components/api/button/Button.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
import { Button } from 'primereact/button';                             
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';

export default function BasicDemo() {
    return (
        <div className="card flex justify-content-center">
            <Button label="Check" icon="pi pi-check" />
        </div>
    )
}
        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';

export default function BasicDemo() {
    return (
        <div className="card flex justify-content-center">
            <Button label="Check" icon="pi pi-check" />
        </div>
    )
}
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Each component can be imported individually so that you only bundle what you use. Import path is available in the documentation of the corresponding component.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button label="Check" icon="pi pi-check" />
</div>
<DocSectionCode {code} />

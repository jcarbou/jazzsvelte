<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Badge value="2" 
    pt={{ root: { class: 'bg-primary border-round-sm' } }} />
        `,
        javascript: `
import React from 'react'; 
import { Badge } from 'primereact/badge';


        <div class="card flex justify-content-center">
            <Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Badge } from 'primereact/badge';


        <div class="card flex justify-content-center">
            <Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection} />
<div class="card flex justify-content-center">
    <Badge value="2" pt={{ root: { class: 'bg-primary border-round-sm' } }} />
</div>
<DocSectionCode {code} />

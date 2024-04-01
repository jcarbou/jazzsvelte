<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Badge from '$lib/components/badge/Badge.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Badge value="2"></Badge>
        `,
        javascript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex justify-content-center">
            <Badge value="2"></Badge>
        </div>


        `,
        typescript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex justify-content-center">
            <Badge value="2"></Badge>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Text to display is defined with the <i>value</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Badge value="2"></Badge>
</div>
<DocSectionCode {code} />

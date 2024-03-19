<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Badge from '$lib/components/badge/Badge.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection

    const code = {
        basic: `
<Badge value="6" size="xlarge" severity="success"></Badge>
<Badge value="4" size="large" severity="warning"></Badge>
<Badge value="2"></Badge>
        `,
        javascript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center align-items-end gap-2">
            <Badge value="6" size="xlarge" severity="success"></Badge>
            <Badge value="4" size="large" severity="warning"></Badge>
            <Badge value="2"></Badge>
        </div>


        `,
        typescript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center align-items-end gap-2">
            <Badge value="6" size="xlarge" severity="success"></Badge>
            <Badge value="4" size="large" severity="warning"></Badge>
            <Badge value="2"></Badge>
        </div>


        `
    };

</script>

<DocSectionText docSection={docSection}>
                <p>
                    Use the <i>size</i> property to customize the size of a Badge, currently <i>large</i> and <i>xlarge</i> are available as size options.
                </p>
            </DocSectionText>
            <div class="card flex flex-wrap justify-content-center align-items-end gap-2">
                <Badge value="6" size="xlarge" severity="success"></Badge>
                <Badge value="4" size="large" severity="warning"></Badge>
                <Badge value="2"></Badge>
            </div>
            <DocSectionCode code={code} />




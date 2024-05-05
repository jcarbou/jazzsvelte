<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Badge } from '@jazzsvelte/badge'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Badge value="2"></Badge>
<Badge value="8" severity="success"></Badge>
<Badge value="4" severity="info"></Badge>
<Badge value="12" severity="warning"></Badge>
<Badge value="3" severity="danger"></Badge>
        `,
        javascript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center gap-2">
            <Badge value="2"></Badge>
            <Badge value="8" severity="success"></Badge>
            <Badge value="4" severity="info"></Badge >
            <Badge value="12" severity="warning"></Badge>
            <Badge value="3" severity="danger"></Badge>
        </div>


        `,
        typescript: `
import React from 'react';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center gap-2">
            <Badge value="2"></Badge>
            <Badge value="8" severity="success"></Badge>
            <Badge value="4" severity="info"></Badge >
            <Badge value="12" severity="warning"></Badge>
            <Badge value="3" severity="danger"></Badge>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i>
        in addition to the default theme color.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Badge value="2"></Badge>
    <Badge value="8" severity="success"></Badge>
    <Badge value="4" severity="info"></Badge>
    <Badge value="12" severity="warning"></Badge>
    <Badge value="3" severity="danger"></Badge>
</div>
<DocSectionCode {code} />

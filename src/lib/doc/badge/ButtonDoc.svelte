<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Badge from '$lib/components/badge/Badge.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Emails">
    <Badge value="8"></Badge>
</Button>
<Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
    <Badge value="8" severity="danger"></Badge>
</Button>
            `,
        javascript: `
import React from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center gap-2">
            <Button type="button" label="Emails">
                <Badge value="8"></Badge>
            </Button>
            <Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
                <Badge value="8" severity="danger"></Badge>
            </Button>
        </div>


        `,
        typescript: `
import React from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';


        <div class="card flex flex-wrap justify-content-center gap-2">
            <Button type="button" label="Emails">
                <Badge value="8"></Badge>
            </Button>
            <Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
                <Badge value="8" severity="danger"></Badge>
            </Button>
        </div>


        `
    };

</script>

<DocSectionText docSection={docSection}>
                <p>Buttons have built-in support for badges to display a badge inline.</p>
            </DocSectionText>
            <div class="card flex flex-wrap justify-content-center gap-2">
                <Button type="button" label="Emails">
                    <Badge value="8"></Badge>
                </Button>
                <Button type="button" label="Messages" icon="pi pi-users" severity="secondary">
                    <Badge value="8" severity="danger"></Badge>
                </Button>
            </div>
            <DocSectionCode code={code} />




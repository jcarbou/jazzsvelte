<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
</Button>
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex justify-content-center">
            <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
            </Button>
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex justify-content-center">
            <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
            </Button>
        </div>
    )

        `
    }
</script>

<DocSectionText {docSection}>
    <p>Custom content inside a button is defined as children.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem" />
    </Button>
</div>
<DocSectionCode {code} />

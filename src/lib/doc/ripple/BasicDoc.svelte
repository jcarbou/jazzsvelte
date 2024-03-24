<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Ripple from '$lib/components/ripple/Ripple.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<div class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
    Click Me
    <Ripple />
</div>
        `,
        javascript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';


        <div class="card flex justify-content-center align-items-center">
            <div class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
                Click Me
                <Ripple />
            </div>
        </div>


        `,
        typescript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';


        <div class="card flex justify-content-center align-items-center">
            <div class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
                Click Me
                <Ripple />
            </div>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Ripple is enabled by adding the component as a child and applying <i>p-ripple</i> class to the element.
    </p>
</DocSectionText>
<div class="card flex justify-content-center align-items-center">
    <div
        class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple"
    >
        Click Me
        <Ripple />
    </div>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
//_app.js
import { PrimeReactProvider } from 'primereact/api';


    const value = {
        ripple: false,
        ...
    };
        <PrimeReactProvider value={value}>
            <App />
        </PrimeReactProvider>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        To start with, Ripple needs to be enabled globally. See the <a href="/configuration/#ripple">Configuration API</a> for details.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

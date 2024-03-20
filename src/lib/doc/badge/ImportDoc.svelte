<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection

    const code = {
        basic: `
import { Badge } from 'primereact/badge';
        `
    };

</script>

<DocSectionText docSection={docSection} />
            <DocSectionCode code={code} hideToggleCode toImport hideStackBlitz />




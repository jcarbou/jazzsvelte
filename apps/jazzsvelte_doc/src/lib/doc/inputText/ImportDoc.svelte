<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
${importJS('InputText')}
        `
    }
</script>

<DocSectionText {docSection} />
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

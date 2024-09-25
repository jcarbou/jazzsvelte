<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
locale('en');
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        An available locale can be set with <i>locale</i> method at anytime.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props();

    const code = {
        basic: `
import { Panel } from '@jazzsvelte/panel'
        `
    }
</script>

<DocSectionText {docSection} />
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

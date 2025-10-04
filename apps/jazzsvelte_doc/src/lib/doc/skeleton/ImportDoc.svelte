<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importJS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
${importJS('Skeleton')}
`
    }
</script>

<DocSectionText {docSection} />
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
${importTS('MeterGroup')}
`
    }
</script>

<DocSectionText {docSection} />
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

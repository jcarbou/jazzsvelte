<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection} />
<div>
    <img class="w-full" src="https://primefaces.org/cdn/primereact/images/pt/tooltip.jpg" alt="tag" />
</div>

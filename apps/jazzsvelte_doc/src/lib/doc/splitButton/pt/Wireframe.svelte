<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection} />
<div>
    <img class="w-full" src="https://primefaces.org/cdn/primereact/images/pt/splitbutton.jpg" alt="splitbutton" />
</div>

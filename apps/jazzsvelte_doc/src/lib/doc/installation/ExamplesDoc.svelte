<script lang="ts">
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>We've created various samples for the popular options in the React ecosystem.</p>
</DocSectionText>
<div class="flex flex-wrap card justify-content-between gap-3">TODO</div>

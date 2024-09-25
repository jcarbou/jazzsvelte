<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>
        Each PrimeReact theme exports numerous CSS variables, refer to <a href="/colors">Colors</a> page for more details.
    </p>
</DocSectionText>

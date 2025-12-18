<script lang="ts">
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>
        Each PrimeReact theme exports numerous CSS variables, refer to <a href="/colors">Colors</a> page for more details.
    </p>
</DocSectionText>

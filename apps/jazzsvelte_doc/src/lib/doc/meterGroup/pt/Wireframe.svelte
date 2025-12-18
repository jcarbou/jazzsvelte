<script lang="ts">
    import DocSectionText from '../../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection} />
<div>
    <img class="w-full" src="https://primefaces.org/cdn/primereact/images/pt/wireframe-placeholder.jpg" alt="metergroup" />
</div>

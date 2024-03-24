<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h6>Screen Reader</h6>
    <p>
        Ripple element has the <i>aria-hidden</i> attribute as true so that it gets ignored by the screen readers.
    </p>

    <h6>Keyboard Support</h6>
    <p>Component does not include any interactive elements.</p>
</DocSectionText>

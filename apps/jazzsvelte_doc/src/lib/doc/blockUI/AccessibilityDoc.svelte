<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        BlockUI manages <i>aria-busy</i> state attribute when the UI gets blocked and unblocked. Any valid attribute is passed to
        the root element so additional attributes like <i>role</i> and <i>aria-live</i> can be used to define live regions.
    </p>

    <h4>Keyboard Support</h4>
    <p>Component does not include any interactive elements.</p>
</DocSectionText>

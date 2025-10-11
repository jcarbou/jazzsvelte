<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<span id="dd1">Options</span>
<MultiSelect aria-labelledby="dd1" />

<MultiSelect aria-label="Options" />
    `
    }
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        MeterGroup component uses <i>meter</i> role in addition to the <i>aria-valuemin</i>, <i>aria-valuemax</i> and
        <i>aria-valuenow</i>
        attributes. Value to describe the component can be defined using <i>aria-labelledby</i> prop.
    </p>
    <h3>Keyboard Support</h3>
    <p>Component does not include any interactive elements.</p>
</DocSectionText>

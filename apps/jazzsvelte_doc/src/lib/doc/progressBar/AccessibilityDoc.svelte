<script lang="ts">
    import CodeHighlight from '$lib/doc/common/CodeHighlight.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        ProgressBar components uses <i>progressbar</i> role along with <i>aria-valuemin</i>, <i>aria-valuemax</i> and
        <i>aria-valuenow</i>
        attributes. Value to describe the component can be defined using
        <i>aria-labelledby</i> and <i>aria-label</i> props.
    </p>
    <CodeHighlight
        code={`
<span id="label_status">Status</span>
<ProgressBar aria-labelledby="label_status" />

<ProgressBar aria-label="Status" />
`}
    />
    <h3>Keyboard Support</h3>
    <p>Not applicable.</p>
</DocSectionText>

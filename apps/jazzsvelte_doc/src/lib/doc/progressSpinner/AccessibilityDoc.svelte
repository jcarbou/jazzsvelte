<script lang="ts">
    import CodeHighlight from '$lib/doc/common/CodeHighlight.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        ProgressSpinner components uses <i>progressbar</i> role. Value to describe the component can be defined using
        <i>aria-labelledby</i>
        and <i>aria-label</i> props.
    </p>
    <CodeHighlight code={'<ProgressSpinner aria-label="Loading" />'} />

    <h3>Keyboard Support</h3>
    <p>Component does not include any interactive elements.</p>
</DocSectionText>

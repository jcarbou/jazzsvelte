<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import DocTableWrapper from '$lib/doc/common/DocTableWrapper.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let {}: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <DocTableWrapper>
        {#snippet theadContent()}
            <tr>
                <th>Name</th>
                <th>Element</th>
            </tr>
        {/snippet}
        {#snippet tBodyContent()}
            <tr>
                <td>p-ripple</td>
                <td>Host element.</td>
            </tr>
            <tr>
                <td>p-ink</td>
                <td>Ripple element.</td>
            </tr>
            <tr>
                <td>p-ink-active</td>
                <td>Ripple element during animating.</td>
            </tr>
        {/snippet}
    </DocTableWrapper>
</DocSectionText>

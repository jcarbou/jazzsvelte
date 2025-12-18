<script lang="ts">
    import DocSectionText from '../common/DocSectionText.svelte'
    import DocTableWrapper from '../common/DocTableWrapper.svelte'

    import type { DocSection } from '../common/doc.types'

    interface Props {
        docSection: DocSection
    }

    let {}: Props = $props()
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

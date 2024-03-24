<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import DocTableWrapper from '$lib/doc/common/DocTableWrapper.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <DocTableWrapper>
        <tr slot="thead">
            <th>Name</th>
            <th>Element</th>
        </tr>
        <svelte:fragment slot="tbody">
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
        </svelte:fragment>
    </DocTableWrapper>
</DocSectionText>

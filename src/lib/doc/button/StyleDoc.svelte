<script lang="ts">
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming"> theming</a> page.
    </p>
</DocSectionText>
<div class="doc-tablewrapper">
    <table class="doc-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Element</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>p-button</td>
                <td>Button element</td>
            </tr>
            <tr>
                <td>p-button-icon</td>
                <td>Icon element</td>
            </tr>
            <tr>
                <td>p-button-text</td>
                <td>Label element of the button</td>
            </tr>
        </tbody>
    </table>
</div>

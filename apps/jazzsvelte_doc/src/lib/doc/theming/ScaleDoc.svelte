<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
html {
    font-size: 14px;

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        PrimeReact utilizes <i>rem</i> units to make sure the components blend in with the rest of your UI perfectly. This also
        enables scaling, for example changing the size of the components is easy as configuring the font size of your document.
        Code below sets the scale of the components based on <i>16px</i>. If you require bigger or smaller components, just change
        this variable and components will scale accordingly.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

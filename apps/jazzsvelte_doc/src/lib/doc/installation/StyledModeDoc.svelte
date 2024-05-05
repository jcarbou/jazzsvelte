<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
import "primereact/resources/themes/lara-light-cyan/theme.css";
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Styled mode is based on pre-skinned components with opinionated themes like Material, Bootstrap or PrimeOne themes. Theme is the required css file to be imported, visit the <a href="/theming/#themes">Themes</a> section for the complete list of
        available themes to choose from.
    </p>
    <DocSectionCode {code} hideToggleCode hideStackBlitz />
</DocSectionText>

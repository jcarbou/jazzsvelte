<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'
    import { importJS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
${importJS(
    [],
    `import { JazzSvelte } from '@jazzsvelte/api'
   import { Toast } from '@jazzsvelte/toast' <!-- To remove if you don't need Toast message ) -->`
)}
   
<JazzSvelte config={{themePath:'lara-light-cyan'}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Styled mode is based on pre-skinned components with opinionated themes like Material, Bootstrap or PrimeOne themes. Theme
        is the required css file to be imported, visit the <a href="/theming/#themes">Themes</a> section for the complete list of available
        themes to choose from.
    </p>
    <p>In the example above the file themes/lara-light-cyan/theme.css is loaded</p>
    <DocSectionCode {code} hideToggleCode hideStackBlitz />
</DocSectionText>

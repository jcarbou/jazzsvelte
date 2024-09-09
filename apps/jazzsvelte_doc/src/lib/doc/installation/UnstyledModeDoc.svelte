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
   
<JazzSvelte config={{unstyled:true}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Unstyled mode is disabled by default for all components. Using the PrimeReactContext during installation, set <i
            >unstyled</i
        >
        as true to enable it globally. Visit the <a href="/unstyled">Unstyled mode</a> documentation for more information and examples.
    </p>
    <DocSectionCode {code} hideToggleCode hideStackBlitz />
</DocSectionText>

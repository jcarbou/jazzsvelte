<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importObject, importJS, importTS, scriptJS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
${importJS(
    [],
    importObject('JazzSvelte', 'api'),
    `
    const config = {
        ripple: false,
        ...
    }`
)}
    
<JazzSvelte {config}>
   <App />
<JazzSvelte>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        To start with, Ripple needs to be enabled globally. See the <a href="/configuration/#ripple">Configuration API</a> for details.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

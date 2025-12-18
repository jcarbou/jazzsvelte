<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importObject, importJS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

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

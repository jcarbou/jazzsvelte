<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
${importJS(
    [],
    `import { JazzSvelte } from '@jazzsvelte/api'
   import { Toast } from '@jazzsvelte/toast' <!-- To remove if you don't need Toast message ) -->`
)}
   
<JazzSvelte config={{appendTo: 'self'}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        For components with an overlay like a dropdown, popups can be mounted either into the component or DOM element instance
        using this option. Valid values are any DOM Element like document body and <i>self</i>. By default all popups are appended
        to document body via Portals.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

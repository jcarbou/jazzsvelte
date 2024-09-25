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
   
<JazzSvelte config={{nonce: '.........'}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce">nonce</a> value to use on dynamically
        generated style elements.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

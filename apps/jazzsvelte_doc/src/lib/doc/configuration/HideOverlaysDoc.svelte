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
   
<JazzSvelte config={{hideOverlaysOnDocumentScrolling:true}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>

//_app.css
body {
  margin: 0px;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending
        on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow
        the scroll. Default value is false. IMPORTANT: Your <i>document.body</i> must have <i>overflow</i> CSS on this to work properly.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

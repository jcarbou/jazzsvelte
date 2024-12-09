<script lang="ts">
    import { importJS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
${importJS(
    [],
    `import { JazzSvelte } from '@jazzsvelte/api'
   import { Toast } from '@jazzsvelte/toast' <!-- To remove if you don't need Toast message ) -->`
)}
   
<JazzSvelte config={{cssTransition: false}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        JazzSvelte components utilize <a href="https://www.npmjs.com/package/react-transition-group">react-transition-group</a>
        internally to implement animations. Setting <i>cssTransition</i> to false disables all animations.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

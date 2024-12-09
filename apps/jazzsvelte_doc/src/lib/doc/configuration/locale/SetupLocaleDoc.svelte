<script lang="ts">
    import { importJS } from '../../common/doc.utils'
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
   
<JazzSvelte config={{locale: 'de'}}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        To establish the default locale for your entire application, you can utilize the <i>JazzSvelte</i>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

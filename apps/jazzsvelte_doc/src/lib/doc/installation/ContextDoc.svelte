<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'
    import { importJS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `${importJS(
            [],
            `import { JazzSvelte } from '@jazzsvelte/api'
   import { Toast } from '@jazzsvelte/toast' <!-- To remove if you don't need Toast message ) -->`
        )}
   
<JazzSvelte>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Configuration is managed by the <i>JazzSvelte</i> component imported from
        <i>jazzsvelte/api</i>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode hideStackBlitz />

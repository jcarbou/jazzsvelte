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
   import { Toast } from '@jazzsvelte/toast' <!-- To remove if you don't need Toast message ) -->
   
   const config = {
        zIndex: {
            modal: 1100,    // dialog, sidebar
            overlay: 1000,  // dropdown, overlaypanel
            menu: 1000,     // overlay menus
            tooltip: 1100   // tooltip
            toast: 1200     // toast
        },
        autoZIndex: true,
        ...
    };`
)}
   
<JazzSvelte config={config}>
    <MyMainCmp .../>

    <Toast /> <!-- To remove if you don't need Toast message ) -->
</JazzSvelte>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple
        components. Still there may be cases where you'd like to configure the configure default values such as a custom layout
        where header section is fixed. In a case like this, dropdown needs to be displayed below the application header but a
        modal dialog should be displayed above. JazzSvelte configuration offers the <i>zIndex</i> property to customize the default
        values for components categories. Default values are described below and can be customized when setting up the context value.
    </p>
    <p>
        The ZIndex of all components is increased according to their groups in harmony with each other. When <i>autoZIndex</i> is false,
        each group increments its zIndex within itself.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

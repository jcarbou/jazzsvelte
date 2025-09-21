<script lang="ts">
    import { importJS, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { dataJsCode, dataTsCode, items } from './tieredMenu.data'

    export let docSection: DocSection

    const codeBasic = `
<TieredMenu model={items} breakpoint="767px" />
`

    const code = {
        basic: codeBasic,
        javascript: `
${importJS('TieredMenu', dataJsCode)}
${codeBasic}
`,
        typescript: `
${importTS('TieredMenu', importType('MenuItem', 'api'), dataTsCode)}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        TieredMenu requires a collection of menuitems as its <i>model</i>.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} breakpoint="767px" />
</div>
<DocSectionCode {code} />

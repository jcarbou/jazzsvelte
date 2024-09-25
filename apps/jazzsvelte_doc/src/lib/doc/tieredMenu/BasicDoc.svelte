<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { dataJsCode, dataTsCode, items } from './data'

    export let docSection: DocSection

    const code = {
        basic: `
<TieredMenu model={items} breakpoint="767px" />
        `,
        javascript: `
${importJS('TieredMenu', dataJsCode)}

 <TieredMenu model={items} breakpoint="767px" />
        `,
        typescript: `
${importTS('TieredMenu', importType('MenuItem', 'api'), dataTsCode)}

<TieredMenu model={items} breakpoint="767px" />
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

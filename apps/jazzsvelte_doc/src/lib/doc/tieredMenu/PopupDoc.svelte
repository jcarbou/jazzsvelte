<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { dataJsCode, dataTsCode, items } from './data'

    export let docSection: DocSection

    let menu: TieredMenu

    const code = {
        basic: `
<TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
<Button label="Toggle" on:click={(e) => menu.toggle(e)} />
        `,
        javascript: `
${importJS(
    ['TieredMenu', 'Button'],
    `
    let menu`,
    dataJsCode
)}
            
<TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
<Button label="Toggle" on:click={(e) => menu.toggle(e)} />
        `,
        typescript: `
${importTS(
    ['TieredMenu', 'Button'],
    importType('MenuItem', 'api'),
    `
    let menu: TieredMenu`,
    dataTsCode
)}
            
<TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
<Button label="Toggle" on:click={(e) => menu.toggle(e)} />        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Popup mode is enabled by adding <i>popup</i> property and calling <i>toggle</i> method with an event of the target.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
    <Button label="Toggle" on:click={(e) => menu.toggle(e)} />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import { dataJsCode, dataTsCode, items } from './tieredMenu.data'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let menu: TieredMenu

    const codeBasic = `
<TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
<Button label="Toggle" on:click={(e) => menu.toggle(e)} />
`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS(
    ['TieredMenu', 'Button'],
    `
    let menu`,
    dataJsCode
)}
${codeBasic}
`,
        typescript: `
${importTS(
    ['TieredMenu', 'Button'],
    importType('MenuItem', 'api'),
    `
    let menu: TieredMenu`,
    dataTsCode
)}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Popup mode is enabled by adding <i>popup</i> property and calling <i>toggle</i> method with an event of the target.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} popup bind:this={menu} breakpoint="767px" />
    <Button label="Toggle" onclick={(e: Event) => menu.toggle(e)} />
</div>
<DocSectionCode {code} />

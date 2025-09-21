<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'
    const codeVirtualScrollerSlot = `<div
        slot="item"
        let:item
        let:options
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options.$$props.itemSize}px\`}
    >
        {item}
    </div>`
    function codeVirtualScroller(basic: boolean = false) {
        return `    
<VirtualScroller {items} itemSize={50} class="border-1 surface-border border-round" style="width:200px;height:200px;">
   ${basic ? '...' : codeVirtualScrollerSlot}
</VirtualScroller>`
    }

    const code = {
        basic: `
${codeVirtualScroller(true)}
        `,
        javascript: `
${importJS('VirtualScroller', codeItems)}
${codeVirtualScroller()}
 `,
        typescript: `
${importTS('VirtualScroller', codeItems)}
${codeVirtualScroller()}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        VirtualScroller requires <i>items</i> as the data to display, <i>itemSize</i> for the dimensions of an item and
        <i>itemTemplate</i>
        to define the content per item. Size of the viewport is configured using
        <i>scrollWidth</i>, <i>scrollHeight</i> properties directly or with CSS <i>width</i> and <i>height</i> styles.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <VirtualScroller {items} itemSize={50} class="border-1 surface-border border-round" style="width:200px;height:200px;">
        <div
            slot="item"
            let:item
            let:options
            class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
            style={`height: ${options.$$props.itemSize}px`}
        >
            {item}
        </div>
    </VirtualScroller>
</div>
<DocSectionCode {code} />

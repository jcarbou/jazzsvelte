<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)'
    const codeVirtualScrollerSlot = `
    <div
        slot="item"
        let:item
        let:options
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`width: \${options.$$props.itemSize}px;writing-mode:vertical-lr\`}
    >
        {item}
    </div>`
    function codeVirtualScroller(basic: boolean = false) {
        return `
<VirtualScroller
    {items}
    itemSize={50}
    orientation="horizontal"
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
>
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
        Setting <i>orientation</i> to <i>horizontal</i> enables scrolling horizontally. In this case, the <i>itemSize</i> should refer
        to the width of an item.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <VirtualScroller
        {items}
        itemSize={50}
        orientation="horizontal"
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    >
        <div
            slot="item"
            let:item
            let:options
            class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
            style={`width: ${options.$$props.itemSize}px;writing-mode:vertical-lr`}
        >
            {item}
        </div>
    </VirtualScroller>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`))

    const codeItems = `const items =  Array.from({ length: 1000 }).map(
        (_, i) => Array.from({ length: 1000 }).map((_j, j) => \`Item #\${i}_\${j}\`)
    )`
    const codeVirtualScrollerSlot = `<div
        slot="item"
        let:item
        let:options
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options.$$props.itemSize[0]}px\`}
    >
        {#each item as childItem, index (index)}
            <div style={\`width:\${options.$$props.itemSize[1]}px\`}>
                {childItem}
            </div>
        {/each}
    </div>`
    function codeVirtualScroller(basic: boolean = false) {
        return `
<VirtualScroller
    {items}
    itemSize={[50, 100]}
    orientation="both"
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
>
    ${basic ? '...' : codeVirtualScrollerSlot}
</VirtualScroller>`
    }

    const code = {
        basic: `
${codeVirtualScroller(true)}`,
        javascript: `
${importJS('VirtualScroller', codeItems)}
 ${codeVirtualScroller()}`,
        typescript: `
${importTS('VirtualScroller', codeItems)}
 ${codeVirtualScroller()} `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Scrolling can be enabled vertically and horizontally when <i>orientation</i> is set as <i>both</i>. In this mode,
        <i>itemSize</i> should be an array where first value is the height of an item and second is the width.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <VirtualScroller
        {items}
        itemSize={[50, 100]}
        orientation="both"
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    >
        <div
            slot="item"
            let:item
            let:options
            class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
            style={`height: ${options.$$props.itemSize[0]}px`}
        >
            {#each item as childItem, index (index)}
                <div style={`width:${options.$$props.itemSize[1]}px`}>
                    {childItem}
                </div>
            {/each}
        </div>
    </VirtualScroller>
</div>
<DocSectionCode {code} />

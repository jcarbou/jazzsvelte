<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

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
        const code = `
<VirtualScroller {items} itemSize={50} _DELAY_ class="border-1 surface-border border-round" style="width:200px;height:200px;">
    ${basic ? '...' : codeVirtualScrollerSlot}
</VirtualScroller>`
        return code.replace('_DELAY_', '') + code.replace('_DELAY_', 'delay={150}') + code.replace('_DELAY_', 'delay={500}')
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
        The <i>delay</i> property adds a threshold to wait in milliseconds during scrolling for render optimization.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-5">
    <div>
        <span class="font-bold block mb-2">No Delay</span>
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
    <div>
        <span class="font-bold block mb-2">150ms</span>
        <VirtualScroller
            {items}
            itemSize={50}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
            delay={150}
        >
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
    <div>
        <span class="font-bold block mb-2">500ms</span>
        <VirtualScroller
            {items}
            itemSize={50}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
            delay={500}
            ><div
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
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    //import { Skeleton } from '@jazzsvelte/skeleton'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'
    const codeVirtualScrollerSlotItem = `<div
        slot="item"
        let:item
        let:options
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options.$$props.itemSize}px\`}
    >
        {item}
    </div>`
    const codeVirtualScrollerSlotLoading = `<div slot="loading" let:options class={\`flex align-items-center \${options.odd && 'odd'}\`} style="height:50px;">
        <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px" />
    </div>`
    function codeVirtualScroller(basic: boolean = false) {
        return `
<VirtualScroller
    {items}
    itemSize={50}
    showLoader
    delay={250}
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
>
   ${basic ? '...' : codeVirtualScrollerSlotItem}
</VirtualScroller>
<VirtualScroller
    {items}
    itemSize={50}
    showLoader
    delay={250}
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
>    
    ${basic ? '...' : codeVirtualScrollerSlotItem + codeVirtualScrollerSlotLoading}
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
${importJS('VirtualScroller', codeItems)}
${codeVirtualScroller()}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Busy state is enabled by adding <i>showLoader</i> property which blocks the UI with a modal by default. Alternatively,
        <i>loadingTemplate</i>
        can be used to customize items e.g. with <a href="/skeleton">Skeleton</a>.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-5">
    <div>
        <span class="font-bold block mb-2">Modal</span>
        <VirtualScroller
            {items}
            itemSize={50}
            showLoader
            delay={250}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
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
        <span class="font-bold block mb-2">Skeleton</span>
        <VirtualScroller
            {items}
            itemSize={50}
            showLoader
            delay={250}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
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
            <div slot="loading" let:options class={`flex align-items-center ${options.odd && 'odd'}`} style="height:50px;">
                <!---<Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />-->
                <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px" />
            </div>
        </VirtualScroller>
    </div>
</div>
<DocSectionCode {code} />

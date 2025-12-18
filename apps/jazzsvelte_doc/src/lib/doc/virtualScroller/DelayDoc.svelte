<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { VirtualScroller, type VirtualScrollerItemSnippetProps } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '../common/doc.types'
    import { codeItemSnippetTS, codeItemSnippetJS } from './virtualScrollerDoc.codes'
    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'

    function codeVirtualScroller(basic: boolean = false) {
        const code = `
<VirtualScroller {items} itemSize={50} {itemSnippet} _DELAY_ class="border-1 surface-border border-round" style="width:200px;height:200px;">
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
${codeItemSnippetJS}
`,
        typescript: `
${importTS('VirtualScroller', codeItems)}
${codeVirtualScroller()}
${codeItemSnippetTS}
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
        <VirtualScroller
            {items}
            itemSize={50}
            {itemSnippet}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
        ></VirtualScroller>
    </div>
    <div>
        <span class="font-bold block mb-2">150ms</span>
        <VirtualScroller
            {items}
            itemSize={50}
            {itemSnippet}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
            delay={150}
        ></VirtualScroller>
    </div>
    <div>
        <span class="font-bold block mb-2">500ms</span>
        <VirtualScroller
            {items}
            itemSize={50}
            {itemSnippet}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
            delay={500}
        ></VirtualScroller>
    </div>
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${options._props.itemSize}px`}
    >
        {item}
    </div>
{/snippet}

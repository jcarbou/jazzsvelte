<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller, type VirtualScrollerItemSnippetProps } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)'
    const codeItemSnippet = `
    {#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options._props.itemSize}px;writing-mode:vertical-lr\`}
    >
        {item}
    </div>
{/snippet}`
    function codeVirtualScroller(basic: boolean = false) {
        return `
<VirtualScroller
    {items}
    itemSize={50}
    orientation="horizontal"
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
></VirtualScroller>
${basic ? '...' : codeItemSnippet}`
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
        {itemSnippet}
        orientation="horizontal"
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    ></VirtualScroller>
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`width: ${options._props.itemSize}px;writing-mode:vertical-lr`}
    >
        {item}
    </div>
{/snippet}

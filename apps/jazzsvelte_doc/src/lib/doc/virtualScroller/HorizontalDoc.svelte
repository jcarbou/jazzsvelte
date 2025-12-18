<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { VirtualScroller, type VirtualScrollerItemSnippetProps } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item # ${i}`)'
    const codeItemSnippetTS = `
{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options._props.itemSize}px;writing-mode:vertical-lr\`}
    >
        {item}
    </div>
{/snippet}`
    const codeItemSnippetJS = `
{#snippet itemSnippet({ item, options })}
    <div
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options._props.itemSize}px;writing-mode:vertical-lr\`}
    >
        {item}
    </div>
{/snippet}`

    const codeBase = `
<VirtualScroller
    {items}
    itemSize={50}
    orientation="horizontal"
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
></VirtualScroller>`

    const code = {
        basic: `
${codeBase}
${codeItemSnippetTS}
`,
        javascript: `
${importJS('VirtualScroller', codeItems)}
${codeBase}
${codeItemSnippetJS}
`,
        typescript: `
${importTS('VirtualScroller', codeItems)}
${codeBase}
${codeItemSnippetTS}
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

<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { VirtualScroller, type VirtualScrollerItemSnippetProps } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '../common/doc.types'
    import { codeItemArraySnippetTS, codeItemArraySnippetJS } from './virtualScrollerDoc.codes'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`))

    const codeItems = `const items =  Array.from({ length: 1000 }).map(
        (_, i) => Array.from({ length: 1000 }).map((_j, j) => \`Item #\${i}_\${j}\`)
    )`

    const codeBase = `
<VirtualScroller
    {items}
    itemSize={[50, 100]}
    itemSnippet={itemArraySnippet}
    orientation="both"
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
>    
</VirtualScroller>
...
`

    const code = {
        basic: `
${codeBase}
${codeItemArraySnippetTS}
`,
        javascript: `
${importJS('VirtualScroller', codeItems)}
${codeBase}
${codeItemArraySnippetJS}
`,
        typescript: `
${importTS('VirtualScroller', codeItems)}
${codeBase}
${codeItemArraySnippetTS}
`
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
        itemSnippet={itemArraySnippet}
        orientation="both"
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    ></VirtualScroller>
</div>
<DocSectionCode {code} />

{#snippet itemArraySnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${(options._props.itemSize as number[])[0]}px`}
    >
        {#each item as any[] as childItem, index (index)}
            <div style={`width:${(options._props.itemSize as number[])[1]}px`}>
                {childItem}
            </div>
        {/each}
    </div>
{/snippet}

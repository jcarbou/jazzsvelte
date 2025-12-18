<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    //import { Skeleton } from '@jazzsvelte/skeleton'
    import {
        VirtualScroller,
        type VirtualScrollerItemSnippetProps,
        type VirtualScrollerLoadingSnippetProps
    } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '../common/doc.types'
    import { codeItemSnippetTS, codeItemSnippetJS, codeLoadingSnippetTS, codeLoadingSnippetJS } from './virtualScrollerDoc.codes'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'

    const codeBase = `
<VirtualScroller
    {items}
    itemSize={50}
    showLoader
    delay={250}
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
></VirtualScroller>
<VirtualScroller
    {items}
    itemSize={50}
    showLoader
    delay={250}
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
></VirtualScroller>`

    const code = {
        basic: `
${codeBase}
...
`,
        javascript: `
${importJS('VirtualScroller', codeItems)}
${codeBase}
${codeItemSnippetJS}
${codeLoadingSnippetJS}
`,
        typescript: `
${importJS('VirtualScroller', codeItems)}
${codeBase}
${codeItemSnippetTS}
${codeLoadingSnippetTS}
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
            {itemSnippet}
            showLoader
            delay={250}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
        ></VirtualScroller>
    </div>
    <div>
        <span class="font-bold block mb-2">Skeleton</span>
        <VirtualScroller
            {items}
            itemSize={50}
            {itemSnippet}
            {loadingSnippet}
            showLoader
            delay={250}
            class="border-1 surface-border border-round"
            style="width:200px;height:200px;"
        ></VirtualScroller>
    </div>
</div>
<DocSectionCode {code} />

{#snippet loadingSnippet({ options }: VirtualScrollerLoadingSnippetProps)}
    <div class={`flex align-items-center ${options.odd && 'odd'}`} style="height:50px;">
        <!---<Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />-->
        <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px"></div>
    </div>
{/snippet}

{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${options._props.itemSize}px`}
    >
        {item}
    </div>
{/snippet}

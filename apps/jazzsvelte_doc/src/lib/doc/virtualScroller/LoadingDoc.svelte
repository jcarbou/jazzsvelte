<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    //import { Skeleton } from '@jazzsvelte/skeleton'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { itemSnippet, loadingSnippet } from './VirtualScrollerDoc.modules.svelte'
    import { codeItemSnippet, codeLoadingSnippet } from './virtualScrollerDoc.codes'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'
    const codeSnippets = `
    ${codeItemSnippet}
    ${codeLoadingSnippet}`

    function codeVirtualScroller(basic: boolean = false) {
        return `
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
></VirtualScroller>
${basic ? '...' : codeSnippets}`
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

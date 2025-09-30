<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { VirtualScroller } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { itemSnippet } from './VirtualScrollerDoc.modules.svelte'
    import { codeItemSnippetTS, codeItemSnippetJS } from './virtualScrollerDoc.codes'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)

    const codeItems = 'const items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)'

    const codeBase = `    
<VirtualScroller {items} itemSize={50} {itemSnippet} class="border-1 surface-border border-round" style="width:200px;height:200px;">
</VirtualScroller>`

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
        VirtualScroller requires <i>items</i> as the data to display, <i>itemSize</i> for the dimensions of an item and
        <i>itemTemplate</i>
        to define the content per item. Size of the viewport is configured using
        <i>scrollWidth</i>, <i>scrollHeight</i> properties directly or with CSS <i>width</i> and <i>height</i> styles.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <VirtualScroller
        {items}
        itemSize={50}
        {itemSnippet}
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    ></VirtualScroller>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    //import { Skeleton } from '@jazzsvelte/skeleton'
    import { VirtualScroller, type LazyLoadCallback } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import type { TimeoutId } from '@jazzsvelte/api'
    import { onMount } from 'svelte'
    import { itemSnippet, loadingSnippet } from './VirtualScrollerDoc.modules.svelte'
    import { codeItemSnippetTS, codeItemSnippetJS, codeLoadingSnippetTS, codeLoadingSnippetJS } from './virtualScrollerDoc.codes'
    let { docSection }: ComponentDocProps = $props()

    let loadLazyTimeout: TimeoutId = null
    let lazyLoading = $state(true)
    let lazyItems: String[] = $state([])

    onMount(() => {
        lazyItems = Array.from({ length: 100000 })
        lazyLoading = false
    })

    const onLazyLoad: LazyLoadCallback = (event) => {
        lazyLoading = true

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout)
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(
            () => {
                if (!event) return
                const { first, last } = event
                const _lazyItems = [...lazyItems]

                for (let i = first as number; i < (last as number); i++) {
                    _lazyItems[i] = `Item #${i}`
                }

                lazyItems = _lazyItems
                lazyLoading = false
            },
            Math.random() * 1000 + 250
        )
    }

    const codeItemsTS = `
    let loadLazyTimeout: TimeoutId = null
    let lazyLoading = true
    let lazyItems: String[] = []

    onMount(() => {
        lazyItems = Array.from({ length: 100000 })
        lazyLoading = false
    })

    const onLazyLoad: LazyLoadCallback = (event) => {
        lazyLoading = true

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout)
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(
            () => {
                if (!event) return
                const { first, last } = event
                const _lazyItems = [...lazyItems]

                for (let i = first as number; i < (last as number); i++) {
                    _lazyItems[i] = \`Item #\${i}\`
                }

                lazyItems = _lazyItems
                lazyLoading = false
            },
            Math.random() * 1000 + 250
        )
    }`
    const codeItemsJS = `
    let loadLazyTimeout = null
    let lazyLoading = true
    let lazyItems = []

    onMount(() => {
        lazyItems = Array.from({ length: 100000 })
        lazyLoading = false
    })

    const onLazyLoad = (event) => {
        lazyLoading = true

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout)
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(
            () => {
                if (!event) return
                const { first, last } = event
                const _lazyItems = [...lazyItems]

                for (let i = first as number; i < (last as number); i++) {
                    _lazyItems[i] = \`Item #\${i}\`
                }

                lazyItems = _lazyItems
                lazyLoading = false
            },
            Math.random() * 1000 + 250
        )
    }`

    const codeBase = `
 <VirtualScroller
    items={lazyItems}
    itemSize={50}
    {itemSnippet}
    {loadingSnippet}
    lazy
    {onLazyLoad}
    showLoader
    loading={lazyLoading}
    class="border-1 surface-border border-round"
    style="width:200px;height:200px;"
></VirtualScroller>`

    const code = {
        basic: `
${codeBase}
...
`,
        javascript: `
${importJS('VirtualScroller', codeItemsJS)}
${codeBase}
${codeItemSnippetJS}
${codeLoadingSnippetJS}
`,
        typescript: `
${importTS('VirtualScroller', codeItemsTS)}
${codeBase}
${codeItemSnippetTS}
${codeLoadingSnippetTS}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded on
        demand. To implement lazy loading, enable the <i>lazy</i>
        property and implement <i>onLazyLoad</i> callback to
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <VirtualScroller
        items={lazyItems}
        itemSize={50}
        {itemSnippet}
        {loadingSnippet}
        lazy
        {onLazyLoad}
        showLoader
        loading={lazyLoading}
        class="border-1 surface-border border-round"
        style="width:200px;height:200px;"
    ></VirtualScroller>
</div>
<DocSectionCode {code} />

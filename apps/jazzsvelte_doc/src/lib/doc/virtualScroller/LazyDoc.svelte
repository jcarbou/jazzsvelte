<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    //import { Skeleton } from '@jazzsvelte/skeleton'
    import {
        VirtualScroller,
        type LazyLoadCallback,
        type VirtualScrollerItemSnippetProps,
        type VirtualScrollerLoadingSnippetProps
    } from '@jazzsvelte/virtual_scroller'
    import type { ComponentDocProps } from '../common/doc.types'
    import type { TimeoutId } from '@jazzsvelte/api'
    import { onMount } from 'svelte'
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

{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${options._props.itemSize}px`}
    >
        {item}
    </div>
{/snippet}

{#snippet loadingSnippet({ options }: VirtualScrollerLoadingSnippetProps)}
    <div class={`flex align-items-center ${options.odd && 'odd'}`} style="height:50px;">
        <!---<Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />-->
        <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px"></div>
    </div>
{/snippet}

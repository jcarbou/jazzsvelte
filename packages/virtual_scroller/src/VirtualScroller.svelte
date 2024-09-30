<script lang="ts">
    import type {
        VirtualScrollerPassThroughMethodOptions,
        VirtualScrollerPassThroughOptions,
        VirtualScrollerOrientation
    } from './virtualScroller.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        HTMLSpanAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions,
        TimeoutId,
        CssObject
    } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'

    import { getContext } from 'svelte'
    false
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultVirtualScrollerProps as DEFAULT, globalVirtualScrollerPT as globalPt } from './virtualScroller.config'

    type InnerBothState = { rows: number; cols: number }
    type InnerState = InnerBothState | number
    type BothScrollPos = { top: number; left: number }
    type ScrollPos = BothScrollPos | number

    export let appendOnly: boolean = DEFAULT.appendOnly
    export let autoSize: boolean = DEFAULT.autoSize
    export let columns: any = DEFAULT.columns
    export let contentTemplate: typeof SvelteComponent | null = DEFAULT.contentTemplate
    export let delay: number = DEFAULT.delay
    export let disabled: boolean = DEFAULT.disabled
    export let id: string | null = DEFAULT.id
    export let inline: boolean = DEFAULT.inline
    export let items: null | any[] | any[][] = DEFAULT.items
    export let itemSize: number | number[] = DEFAULT.itemSize
    export let itemTemplate: typeof SvelteComponent | null = DEFAULT.itemTemplate
    export let lazy: boolean = DEFAULT.lazy
    export let loaderDisabled: boolean = DEFAULT.loaderDisabled
    export let loaderIconTemplate: typeof SvelteComponent | null = DEFAULT.loaderIconTemplate
    export let loading: boolean = DEFAULT.loading
    export let loadingIcon: string | IconComponent | null = DEFAULT.loadingIcon
    export let loadingTemplate: typeof SvelteComponent | null = DEFAULT.loadingTemplate
    export let numToleratedItems: number = DEFAULT.numToleratedItems
    export let orientation: VirtualScrollerOrientation = DEFAULT.orientation
    export let resizeDelay: number = DEFAULT.resizeDelay
    export let scrollHeight: string | null = DEFAULT.scrollHeight
    export let scrollWidth: string | null = DEFAULT.scrollWidth
    export let showLoader: boolean = DEFAULT.showLoader
    export let showSpacer: boolean = DEFAULT.showSpacer
    export let step: number = DEFAULT.step
    export let tabIndex: number = DEFAULT.tabIndex
    export let pt: VirtualScrollerPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

    export function getElement(): HTMLDivElement {
        return rootEl
    }
    export const displayName = 'VirtualScroller'

    $: ptContext = {
        props: $$props,
        context: {},
        ptOptions,
        unstyled
    } satisfies VirtualScrollerPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: ['p-component', className, {}],
            style,
            'data-pc-name': 'virtualScroller',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "content" element
    $: contentAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'content'
        },
        pt?.content,
        globalPt?.content,
        ptContext
    ) satisfies HTMLDivAttributes

    // "loader" element
    $: loaderAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'loader'
        },
        pt?.loader,
        globalPt?.loader,
        ptContext
    ) satisfies HTMLDivAttributes

    // "spacer" element
    $: spacerAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'spacer'
        },
        pt?.spacer,
        globalPt?.spacer,
        ptContext
    ) satisfies HTMLDivAttributes

    // "loadingIcon" element
    $: resolvedLoadingIcon = resolveIconPT(
        loadingIcon,
        {
            class: []
        },
        pt?.loadingIcon,
        globalPt?.loadingIcon,
        ptContext
    ) satisfies ResolvedIconPT

    $: loadingState = loading || (false satisfies boolean)
    $: vertical = (orientation === 'vertical') satisfies boolean
    $: horizontal = (orientation === 'horizontal') satisfies boolean
    $: both = (orientation === 'both') satisfies boolean
    $: firstState = (both ? { rows: 0, cols: 0 } : 0) satisfies InnerState
    $: lastState = (both ? { rows: 0, cols: 0 } : 0) satisfies InnerState
    $: numItemsInViewportState = (both ? { rows: 0, cols: 0 } : 0) satisfies InnerState
    $: numToleratedItemsState = numToleratedItems satisfies number
    let pageState: number = 0
    let loaderArrState: undefined[] | undefined[][] = []

    let rootEl: HTMLDivElement | null = null //const elementRef = React.useRef(null);
    let contentEl: HTMLDivElement | null = null
    let spacerEl: HTMLDivElement | null = null
    let stickyEl: HTMLDivElement | null = null
    $: lastScrollPos = (both ? { top: 0, left: 0 } : 0) satisfies ScrollPos
    let scrollTimeout: TimeoutId | null = null
    let resizeTimeout: TimeoutId | null = null
    let contentStyle: CssObject = {}
    let spacerStyle: CssObject = {}
    let defaultWidth: number | null = null
    let defaultHeight: number | null = null
    let defaultContentWidth: number | null = null
    let defaultContentHeight: number | null = null
    let isItemRangeChanged: boolean = false
    let lazyLoadState: { first: InnerState; last: InnerState } | null = null

    function bothState(state: InnerState): InnerBothState {
        return state as InnerBothState
    }

    function simpleState(state: InnerState): number {
        return state as number
    }

    function bothSize(size: number | number[]): number[] {
        return size as number[]
    }
    function simpleSize(size: number | number[]): number {
        return size as number
    }

    function calculateFirst(_index: number = 0, _numT: number): number {
        return _index <= _numT ? 0 : _index
    }
    function calculateCoord(_first: number, _size: number, _cpos: number): number {
        return _first * _size + _cpos
    }
    function calculateFirstInViewport(_pos: number, _size: number): number {
        return Math.floor(_pos / (_size || _pos))
    }

    function getPageByFirst(first: number): number {
        return Math.floor((first + numToleratedItemsState * 4) / (step || 1))
    }

    function setContentElement(element) {
        contentEl = element || DomHandler.findSingle(elementEl, '.p-virtualscroller-content')
    }

    function isPageChanged(first: number): boolean {
        return step ? pageState !== getPageByFirst(first) : true
    }

    function scrollTo(options: ScrollToOptions): void {
        lastScrollPos = both ? { top: 0, left: 0 } : 0
        rootEl?.scrollTo(options)
    }

    function scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto'): void {
        const { numToleratedItems } = calculateNumItems()
        const contentPos = getContentPosition()
        const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior })
        let newFirst = both ? { rows: 0, cols: 0 } : 0
        let isRangeChanged = false

        if (both) {
            newFirst = {
                rows: calculateFirst(bothSize(index)[0], numToleratedItems[0]),
                cols: calculateFirst(bothSize(index)[1], numToleratedItems[1])
            }
            scrollToItem(
                calculateCoord(newFirst.cols, bothSize(itemSize)[1], contentPos.left),
                calculateCoord(newFirst.rows, bothSize(itemSize)[0], contentPos.top)
            )
            isRangeChanged = bothState(firstState).rows !== newFirst.rows || bothState(firstState).cols !== newFirst.cols
        } else {
            newFirst = calculateFirst(simpleSize(index), numToleratedItems)
            horizontal
                ? scrollToItem(calculateCoord(newFirst, simpleSize(itemSize), contentPos.left), 0)
                : scrollToItem(0, calculateCoord(newFirst, simpleSize(itemSize), contentPos.top))
            isRangeChanged = firstState !== newFirst
        }

        isItemRangeChanged = isRangeChanged
        firstState = newFirst
    }

    function scrollInView(index: number | number[], to: 'to-start' | 'to-end', behavior: ScrollBehavior = 'auto'): void {
        if (!to) {
            scrollToIndex(index, behavior)
            return
        }
        const { first, viewport } = getRenderedRange()
        const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior })
        const isToStart = to === 'to-start'
        const isToEnd = to === 'to-end'

        if (isToStart) {
            if (both) {
                if (viewport.first.rows - first.rows > bothSize(index)[0]) {
                    scrollToItem(viewport.first.cols * bothSize(itemSize)[1], (viewport.first.rows - 1) * bothSize(itemSize)[0])
                } else if (viewport.first.cols - first.cols > bothSize(index)[1]) {
                    scrollToItem((viewport.first.cols - 1) * bothSize(itemSize)[1], viewport.first.rows * bothSize(itemSize)[0])
                }
            } else if (viewport.first - first > simpleSize(index)) {
                const pos = (viewport.first - 1) * simpleSize(itemSize)
                horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos)
            }
        } else if (isToEnd) {
            if (both) {
                if (viewport.last.rows - first.rows <= bothSize(index)[0] + 1) {
                    scrollToItem(viewport.first.cols * bothSize(itemSize)[1], (viewport.first.rows + 1) * bothSize(itemSize)[0])
                } else if (viewport.last.cols - first.cols <= bothSize(index)[1] + 1) {
                    scrollToItem((viewport.first.cols + 1) * bothSize(itemSize)[1], viewport.first.rows * bothSize(itemSize)[0])
                }
            } else if (viewport.last - first <= simpleSize(index) + 1) {
                const pos = (viewport.first + 1) * simpleSize(itemSize)
                horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos)
            }
        }
    }

    function getRows(): any[] | any[][] {
        return loadingState ? (loaderDisabled ? loaderArrState : []) : loadedItems()
    }

    function getColumns(): any[] | any[][] {
        if ((columns && both) || horizontal) {
            return loadingState && loaderDisabled
                ? both
                    ? loaderArrState[0]
                    : loaderArrState
                : columns.slice(both ? bothState(firstState).cols : firstState, both ? bothState(lastState).cols : lastState)
        }

        function getRenderedRange(): {
            first: InnerState
            last: InnerState
            viewport: {
                first: InnerState
                last: InnerState
            }
        } {
            let firstInViewport: InnerState = firstState
            let lastInViewport: InnerState = 0

            if (rootEl) {
                const { scrollTop, scrollLeft } = rootEl

                if (both) {
                    firstInViewport = {
                        rows: calculateFirstInViewport(scrollTop, bothSize(itemSize)[0]),
                        cols: calculateFirstInViewport(scrollLeft, bothSize(itemSize)[1])
                    }
                    lastInViewport = {
                        rows: firstInViewport.rows + bothState(numItemsInViewportState).rows,
                        cols: firstInViewport.cols + bothState(numItemsInViewportState).cols
                    }
                } else {
                    const scrollPos = horizontal ? scrollLeft : scrollTop

                    firstInViewport = calculateFirstInViewport(scrollPos, simpleSize(itemSize))
                    lastInViewport = firstInViewport + simpleState(numItemsInViewportState)
                }
            }

            return {
                first: firstState,
                last: lastState,
                viewport: {
                    first: firstInViewport,
                    last: lastInViewport
                }
            }
        }
        return columns
    }

    function calculateNumItems(): { numItemsInViewport; numToleratedItems } {
        const contentPos = getContentPosition()
        const contentWidth = rootEl ? rootEl.offsetWidth - contentPos.left : 0
        const contentHeight = rootEl ? rootEl.offsetHeight - contentPos.top : 0
        const calculateNumItemsInViewport = (_contentSize: number, _itemSize: number) =>
            Math.ceil(_contentSize / (_itemSize || _contentSize))
        const calculateNumToleratedItems = (_numItems: number) => Math.ceil(_numItems / 2)
        const numItemsInViewport = both
            ? {
                  rows: calculateNumItemsInViewport(contentHeight, bothSize(itemSize)[0]),
                  cols: calculateNumItemsInViewport(contentWidth, bothSize(itemSize)[1])
              }
            : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, simpleSize(itemSize))

        const numToleratedItems =
            numToleratedItemsState ||
            (both
                ? [
                      calculateNumToleratedItems(bothState(numItemsInViewport).rows),
                      calculateNumToleratedItems(bothState(numItemsInViewport).cols)
                  ]
                : calculateNumToleratedItems(simpleState(numItemsInViewport)))

        return { numItemsInViewport, numToleratedItems }
    }

    function calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = calculateNumItems()
        const calculateLast = (_first: number, _num: number, _numT: number, _isCols = false) =>
            getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols)
        const last = both
            ? {
                  rows: calculateLast(firstState.rows, numItemsInViewport.rows, numToleratedItems[0]),
                  cols: calculateLast(firstState.cols, numItemsInViewport.cols, numToleratedItems[1], true)
              }
            : calculateLast(firstState, numItemsInViewport, numToleratedItems)

        setNumItemsInViewportState(numItemsInViewport)
        setNumToleratedItemsState(numToleratedItems)
        setLastState(last)

        if (props.showLoader) {
            setLoaderArrState(
                both
                    ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols }))
                    : Array.from({ length: numItemsInViewport })
            )
        }

        if (props.lazy) {
            Promise.resolve().then(() => {
                lazyLoadState.current = {
                    first: props.step ? (both ? { rows: 0, cols: firstState.cols } : 0) : firstState,
                    last: Math.min(props.step ? props.step : last, (props.items || []).length)
                }

                props.onLazyLoad && props.onLazyLoad(lazyLoadState.current)
            })
        }
    }

    function loadedItems(): any[] | any[][] {
        if (items && !loadingState) {
            if (both) {
                return items
                    .slice(appendOnly ? 0 : bothState(firstState).rows, bothState(lastState).rows)
                    .map((item) =>
                        columns ? item : item.slice(appendOnly ? 0 : bothState(firstState).cols, bothState(lastState).cols)
                    )
            } else if (horizontal && columns) {
                return items
            }

            return items.slice(appendOnly ? 0 : simpleState(firstState), simpleState(lastState))
        }

        return []
    }

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

<div bind:this={rootEl} {...rootAttributes} {...$$restProps}>
    {#if $$slots.content}
        <slot name="content" />
    {:else}
        <div {...contentAttributes}>{items}</div>
    {/if}
    <div {...loaderAttributes}></div>
    <div {...spacerAttributes}></div>
    <IconBuilder resolvedIcon={resolvedLoadingIcon} />
</div>

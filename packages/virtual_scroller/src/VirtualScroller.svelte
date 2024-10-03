<script lang="ts">
    import type {
        VirtualScrollerPassThroughMethodOptions,
        VirtualScrollerPassThroughOptions,
        VirtualScrollerOrientation
    } from './virtualScroller.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions,
        TimeoutId,
        CssObject
    } from '@jazzsvelte/api'
    import { afterUpdate, getContext, onMount } from 'svelte'
    import { withPrevious } from 'svelte-previous'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultVirtualScrollerProps as DEFAULT, globalVirtualScrollerPT as globalPt } from './virtualScroller.config'
    import { getHeight, getWidth, isVisible } from '@jazzsvelte/dom'

    type InnerBothState = { rows: number; cols: number }
    type InnerState = InnerBothState | number
    type BothScrollPos = { top: number; left: number }
    type ScrollPos = BothScrollPos | number
    type LazyLoadState = { first: InnerState; last: InnerState } | null
    type Columns = any[]
    type Items = any[] | any[][]

    export let appendOnly: boolean = DEFAULT.appendOnly
    export let autoSize: boolean = DEFAULT.autoSize
    export let columns: Columns | null = DEFAULT.columns
    export let contentTemplate: typeof SvelteComponent | null = DEFAULT.contentTemplate
    export let delay: number = DEFAULT.delay
    export let disabled: boolean = DEFAULT.disabled
    export let id: string | null = DEFAULT.id
    export let inline: boolean = DEFAULT.inline
    export let items: Items | null = DEFAULT.items
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
    export let onLazyLoad: ((state: LazyLoadState) => void) | null = null
    export let onScrollIndexChange: ((state: LazyLoadState) => void) | null = null
    export let onScroll: ((event: Event) => void) | null = null

    export function getElement(): HTMLDivElement | null {
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

    $: vertical = (orientation === 'vertical') satisfies boolean
    $: horizontal = (orientation === 'horizontal') satisfies boolean
    $: both = (orientation === 'both') satisfies boolean
    let loadingState: boolean = false
    let numToleratedItemsState: number = -1
    let pageState: number = 0
    let loaderArrState: undefined[] | undefined[][] = []
    let firstState: InnerState = 0
    let lastState: InnerState = 0
    let numItemsInViewportState: InnerState = 0

    let rootEl: HTMLDivElement | null = null //const elementRef = React.useRef(null);
    let contentEl: HTMLDivElement | null = null
    let spacerEl: HTMLDivElement | null = null
    let stickyEl: HTMLDivElement | null = null
    let lastScrollPos: ScrollPos = 0
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

    // Update lastScrollPos,firstState and lastState when both (orientation) change
    $: if (both !== undefined) {
        lastScrollPos = both ? { top: 0, left: 0 } : 0
        firstState = both ? { rows: 0, cols: 0 } : 0
        lastState = both ? { rows: 0, cols: 0 } : 0
        numItemsInViewportState = both ? { rows: 0, cols: 0 } : 0
    }
    $: if (loading !== undefined) loadingState = loading

    function bothState(state: InnerState): InnerBothState {
        return state as InnerBothState
    }

    function simpleState(state: InnerState): number {
        return state as number
    }
    function bothPos(pos: ScrollPos): BothScrollPos {
        return pos as BothScrollPos
    }

    function simplePos(pos: ScrollPos): number {
        return pos as number
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
                  rows: calculateLast(bothState(firstState).rows, numItemsInViewport.rows, numToleratedItems[0]),
                  cols: calculateLast(bothState(firstState).cols, numItemsInViewport.cols, numToleratedItems[1], true)
              }
            : calculateLast(simpleState(firstState), numItemsInViewport, numToleratedItems)

        numItemsInViewportState = numItemsInViewport
        numToleratedItemsState = numToleratedItems
        lastState = last

        if (showLoader) {
            loaderArrState = both
                ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols }))
                : Array.from({ length: numItemsInViewport })
        }

        if (lazy) {
            Promise.resolve().then(() => {
                lazyLoadState = {
                    first: step ? (both ? { rows: 0, cols: bothState(firstState).cols } : 0) : firstState,
                    last: Math.min(step ? step : last, (items || []).length)
                }

                onLazyLoad && onLazyLoad(lazyLoadState)
            })
        }
    }

    function calculateAutoSize(loading: boolean): void {
        if (autoSize && !loading && defaultWidth !== null && defaultHeight != null) {
            Promise.resolve().then(() => {
                if (contentEl && rootEl) {
                    contentEl.style.minHeight = contentEl.style.minWidth = 'auto'
                    contentEl.style.position = 'relative'
                    rootEl.style.contain = 'none'

                    const [width, height] = [getWidth(rootEl), getHeight(rootEl)]

                    ;(both || horizontal) &&
                        (rootEl.style.width = (width < defaultWidth ? width : scrollWidth || defaultWidth) + 'px')
                    ;(both || vertical) &&
                        (rootEl.style.height = (height < defaultHeight ? height : scrollHeight || defaultHeight) + 'px')

                    contentEl.style.minHeight = contentEl.style.minWidth = ''
                    contentEl.style.position = ''
                    rootEl.style.contain = ''
                }
            })
        }
    }

    function getLast(last: number = 0, isCols: boolean) {
        return items ? Math.min(isCols ? (columns || items[0])?.length || 0 : (items || []).length, last) : 0
    }

    const getContentPosition = () => {
        if (contentEl) {
            const style = getComputedStyle(contentEl)
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0)
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0)
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0)
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0)

            return { left, right, top, bottom, x: left + right, y: top + bottom }
        }

        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 }
    }

    function setSize() {
        if (rootEl) {
            const parentElement = rootEl.parentElement
            const width = scrollWidth || `${rootEl.offsetWidth || parentElement?.offsetWidth}px`
            const height = scrollHeight || `${rootEl.offsetHeight || parentElement?.offsetHeight}px`
            const setProp = (_name: 'width' | 'height', _value: string) => rootEl && (rootEl.style[_name] = _value)

            if (both || horizontal) {
                setProp('height', height)
                setProp('width', width)
            } else {
                setProp('height', height)
            }
        }
    }

    function setSpacerSize() {
        if (items) {
            const contentPos = getContentPosition()
            const setProp = (_name: 'width' | 'height', _value: Items, _size: number, _cpos = 0) =>
                (spacerStyle = { ...spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' } })

            if (both) {
                setProp('height', items, bothSize(itemSize)[0], contentPos.y)
                setProp('width', columns || items[1], bothSize(itemSize)[1], contentPos.x)
            } else {
                horizontal
                    ? setProp('width', columns || items, simpleSize(itemSize), contentPos.x)
                    : setProp('height', items, simpleSize(itemSize), contentPos.y)
            }
        }
    }

    function setContentPosition(pos: LazyLoadState) {
        if (contentEl && !appendOnly) {
            const first = pos ? pos.first : firstState
            const calculateTranslateVal = (_first: number, _size: number) => _first * _size

            const setTransform = (_x = 0, _y = 0) => {
                stickyEl && (stickyEl.style.top = `-${_y}px`)
                contentStyle = { ...contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } }
            }

            if (both) {
                setTransform(
                    calculateTranslateVal(bothState(first).cols, bothSize(itemSize)[1]),
                    calculateTranslateVal(bothState(first).rows, bothSize(itemSize)[0])
                )
            } else {
                const translateVal = calculateTranslateVal(simpleState(first), simpleSize(itemSize))

                horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal)
            }
        }
    }

    function onScrollPositionChange(event) {
        const target = event.target
        const contentPos = getContentPosition()
        const calculateScrollPos = (_pos: number, _cpos: number) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0)
        const calculateCurrentIndex = (_pos: number, _size: number) => Math.floor(_pos / (_size || _pos))

        const calculateTriggerIndex = (
            _currentIndex: number,
            _first: number,
            _last: number,
            _num: number,
            _numT: number,
            _isScrollDownOrRight: boolean
        ) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1
        }

        const calculateFirst = (
            _currentIndex: number,
            _triggerIndex: number,
            _first: number,
            _last: number,
            _num: number,
            _numT: number,
            _isScrollDownOrRight: boolean
        ) => {
            if (_currentIndex <= _numT) {
                return 0
            }

            return Math.max(
                0,
                _isScrollDownOrRight
                    ? _currentIndex < _triggerIndex
                        ? _first
                        : _currentIndex - _numT
                    : _currentIndex > _triggerIndex
                      ? _first
                      : _currentIndex - 2 * _numT
            )
        }

        const calculateLast = (
            _currentIndex: number,
            _first: number,
            _last: number,
            _num: number,
            _numT: number,
            _isCols: boolean
        ) => {
            let lastValue = _first + _num + 2 * _numT

            if (_currentIndex >= _numT) {
                lastValue = lastValue + (_numT + 1)
            }

            return getLast(lastValue, _isCols)
        }

        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top)
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left)

        let newFirst = both ? { rows: 0, cols: 0 } : 0
        let newLast = lastState
        let isRangeChanged = false
        let newScrollPos = lastScrollPos

        if (both) {
            const isScrollDown = bothPos(lastScrollPos).top <= scrollTop
            const isScrollRight = bothPos(lastScrollPos).left <= scrollLeft

            if (!appendOnly || (appendOnly && (isScrollDown || isScrollRight))) {
                const currentIndex = {
                    rows: calculateCurrentIndex(scrollTop, bothSize(itemSize)[0]),
                    cols: calculateCurrentIndex(scrollLeft, bothSize(itemSize)[1])
                }
                const triggerIndex = {
                    rows: calculateTriggerIndex(
                        currentIndex.rows,
                        bothState(firstState).rows,
                        bothState(lastState).rows,
                        bothState(numItemsInViewportState).rows,
                        bothSize(numToleratedItemsState)[0],
                        isScrollDown
                    ),
                    cols: calculateTriggerIndex(
                        bothState(currentIndex).cols,
                        bothState(firstState).cols,
                        bothState(lastState).cols,
                        bothState(numItemsInViewportState).cols,
                        bothSize(numToleratedItemsState)[1],
                        isScrollRight
                    )
                }

                newFirst = {
                    rows: calculateFirst(
                        bothState(currentIndex).rows,
                        bothState(triggerIndex).rows,
                        bothState(firstState).rows,
                        bothState(lastState).rows,
                        bothState(numItemsInViewportState).rows,
                        bothSize(numToleratedItemsState)[0],
                        isScrollDown
                    ),
                    cols: calculateFirst(
                        bothState(currentIndex).cols,
                        bothState(triggerIndex).cols,
                        bothState(firstState).cols,
                        bothState(lastState).cols,
                        bothState(numItemsInViewportState).cols,
                        bothSize(numToleratedItemsState)[1],
                        isScrollRight
                    )
                }
                newLast = {
                    rows: calculateLast(
                        bothState(currentIndex).rows,
                        bothState(newFirst).rows,
                        bothState(lastState).rows,
                        bothState(numItemsInViewportState).rows,
                        bothSize(numToleratedItemsState)[0],
                        false
                    ),
                    cols: calculateLast(
                        bothState(currentIndex).cols,
                        bothState(newFirst).cols,
                        bothState(lastState).cols,
                        bothState(numItemsInViewportState).cols,
                        bothSize(numToleratedItemsState)[1],
                        true
                    )
                }

                isRangeChanged =
                    newFirst.rows !== bothState(firstState).rows ||
                    newLast.rows !== bothState(lastState).rows ||
                    newFirst.cols !== bothState(firstState).cols ||
                    newLast.cols !== bothState(lastState).cols ||
                    isItemRangeChanged
                newScrollPos = { top: scrollTop, left: scrollLeft }
            }
        } else {
            const scrollPos = horizontal ? scrollLeft : scrollTop
            const isScrollDownOrRight = simplePos(lastScrollPos) <= scrollPos

            if (!appendOnly || (appendOnly && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, simpleSize(itemSize))
                const triggerIndex = calculateTriggerIndex(
                    currentIndex,
                    simpleState(firstState),
                    simpleState(lastState),
                    simpleState(numItemsInViewportState),
                    simpleState(numToleratedItemsState),
                    isScrollDownOrRight
                )

                newFirst = calculateFirst(
                    currentIndex,
                    triggerIndex,
                    simpleState(firstState),
                    simpleState(lastState),
                    simpleState(numItemsInViewportState),
                    simpleState(numToleratedItemsState),
                    isScrollDownOrRight
                )
                newLast = calculateLast(
                    currentIndex,
                    newFirst,
                    simpleState(lastState),
                    simpleState(numItemsInViewportState),
                    simpleState(numToleratedItemsState),
                    false
                )
                isRangeChanged = newFirst !== firstState || newLast !== lastState || isItemRangeChanged
                newScrollPos = scrollPos
            }
        }

        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        }
    }

    function onScrollChange(event: Event) {
        const { first, last, isRangeChanged, scrollPos } = onScrollPositionChange(event)

        if (isRangeChanged) {
            const newState = { first, last }

            setContentPosition(newState)

            firstState = first
            lastState = last
            lastScrollPos = scrollPos

            onScrollIndexChange?.(newState)

            if (lazy && isPageChanged(simpleState(first))) {
                const newLazyLoadState = {
                    first: step ? Math.min(getPageByFirst(simpleState(first)) * step, (items || []).length - step) : first,
                    last: Math.min(
                        step ? (getPageByFirst(simpleState(first)) + 1) * step : simpleState(last),
                        (items || []).length
                    )
                }

                const isLazyStateChanged =
                    !lazyLoadState ||
                    lazyLoadState.first !== newLazyLoadState.first ||
                    lazyLoadState.last !== newLazyLoadState.last

                isLazyStateChanged && onLazyLoad?.(newLazyLoadState)
                lazyLoadState = newLazyLoadState
            }
        }
    }

    function _onScroll(event: Event) {
        onScroll?.(event)

        if (delay) {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }

            if (isPageChanged(simpleState(firstState))) {
                if (!loadingState && showLoader) {
                    const { isRangeChanged } = onScrollPositionChange(event)
                    const changed = isRangeChanged || (step ? isPageChanged(simpleState(firstState)) : false)

                    changed && (loadingState = true)
                }

                scrollTimeout = setTimeout(() => {
                    onScrollChange(event)

                    if (loadingState && showLoader && (!lazy || loading === undefined)) {
                        loadingState = false
                        pageState = getPageByFirst(simpleState(firstState))
                    }
                }, delay)
            }
        } else {
            onScrollChange(event)
        }
    }

    function onResize() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
        }

        resizeTimeout = setTimeout(() => {
            if (rootEl) {
                const [width, height] = [getWidth(rootEl), getHeight(rootEl)]
                const [isDiffWidth, isDiffHeight] = [width !== defaultWidth, height !== defaultHeight]
                const reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false

                if (reinit) {
                    numToleratedItemsState = numToleratedItems
                    defaultWidth = width
                    defaultHeight = height
                    defaultContentWidth = getWidth(contentEl)
                    defaultContentHeight = getHeight(contentEl)
                }
            }
        }, resizeDelay)
    }

    function getOptions(renderedIndex: number) {
        const count = (items || []).length
        const index = both ? bothState(firstState).rows + renderedIndex : simpleState(firstState) + renderedIndex

        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            $$props
        }
    }

    function loaderOptions(index: number, extOptions: any) {
        const count = loaderArrState.length || 0

        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            $$props,
            ...extOptions
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

    function viewInit() {
        if (rootEl && isVisible(rootEl)) {
            setContentElement(contentEl)
            init()
            bindWindowResizeListener()
            bindOrientationChangeListener()

            defaultWidth = getWidth(rootEl)
            defaultHeight = getHeight(rootEl)
            defaultContentWidth = getWidth(contentEl)
            defaultContentHeight = getHeight(contentEl)
        }
    }

    function init() {
        if (!disabled) {
            setSize()
            calculateOptions()
            setSpacerSize()
        }
    }

    onMount(() => viewInit())

    // TODO :  reactToChanges(itemSize, scrollHeight, scrollWidth )
    $: if (itemSize !== undefined || scrollHeight !== undefined || scrollWidth !== undefined) {
        init()
    }

    $: if (numToleratedItems !== numToleratedItemsState) {
        numToleratedItems = numToleratedItemsState
    }

    $: if (numToleratedItems === numToleratedItemsState) {
        init() // reinit after resizing
    }

    const [currentItems, previousItems] = withPrevious<Items | null>(null)
    const [currentLoading, previousLoading] = withPrevious<boolean>(false)
    $: $currentItems = items
    $: $currentLoading = loading

    afterUpdate(() => {
        // Check if the previous/current rows array exists
        const prevRowsExist = $previousItems !== undefined && $previousItems !== null
        const currentRowsExist = items !== undefined && items !== null

        // Get the length of the previous/current rows array, or 0 if it doesn't exist
        const prevRowsLength = prevRowsExist ? $previousItems.length : 0
        const currentRowsLength = currentRowsExist ? items?.length ?? 0 : 0

        // Check if the length of the rows arrays has changed
        let valuesChanged = prevRowsLength !== currentRowsLength

        // If both is true, we also need to check the lengths of the first element (assuming it's a matrix)
        if (both && !valuesChanged) {
            // Get the length of the columns or 0
            const prevColumnsLength = prevRowsExist && $previousItems.length > 0 ? $previousItems[0].length : 0
            const currentColumnsLength = currentRowsExist && (items?.length ?? 0) > 0 ? items?.[0].length ?? 0 : 0

            // Check if the length of the columns has changed
            valuesChanged = prevColumnsLength !== currentColumnsLength
        }

        // If the previous items array doesn't exist or if any values have changed, call the init function
        if (!prevRowsExist || valuesChanged) {
            init()
        }

        let _loading = loadingState

        if (lazy && $previousLoading !== loading && loading !== loadingState) {
            loadingState = loading
            _loading = loading
        }

        calculateAutoSize(_loading)
    })

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

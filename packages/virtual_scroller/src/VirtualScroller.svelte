<script lang="ts">
    import type {
        VirtualScrollerProps,
        InnerBothState,
        InnerState,
        LazyLoadState,
        VirtualScrollerPtContext,
        VirtualScrollerLoadingSnippetOptions,
        ScrollPos,
        VirtualScrollerRenderedRange
    } from './virtualScroller.types'

    import type { TimeoutId, CssObject } from '@jazzsvelte/api'
    import { onMount } from 'svelte'
    import { resolveDivPt, resolveIconPT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultVirtualScrollerProps as DEFAULT, globalVirtualScrollerPT as globalPt } from './virtualScroller.config'
    import { getHeight, getWidth, isVisible, findSingleEl } from '@jazzsvelte/dom'
    import { windowEvents } from '@jazzsvelte/window_events_action'
    import {
        bothPos,
        bothSize,
        bothState,
        compueSpacerSize,
        computeLoadItems,
        getContentPosition,
        updateRootElSize,
        simplePos,
        simpleSize,
        simpleState
    } from './virtualScroller.utils'

    type Columns = any[]
    type Items = any[] | any[][]

    let {
        children,
        appendOnly = DEFAULT.appendOnly,
        autoSize = DEFAULT.autoSize,
        class: className = DEFAULT.class,
        columns = DEFAULT.columns,
        contentSnippet = null,
        delay = DEFAULT.delay,
        disabled = DEFAULT.disabled,
        id = DEFAULT.id,
        inline = DEFAULT.inline,
        items = DEFAULT.items,
        itemSize,
        itemSnippet = null,
        lazy = DEFAULT.lazy,
        loaderDisabled = DEFAULT.loaderDisabled,
        loading = DEFAULT.loading,
        loadingIcon = DEFAULT.loadingIcon,
        loadingSnippet = null,
        numToleratedItems = DEFAULT.numToleratedItems,
        orientation = DEFAULT.orientation,
        resizeDelay = DEFAULT.resizeDelay,
        scrollHeight = DEFAULT.scrollHeight,
        scrollWidth = DEFAULT.scrollWidth,
        showLoader = DEFAULT.showLoader,
        showSpacer = DEFAULT.showSpacer,
        step = DEFAULT.step,
        tabIndex = DEFAULT.tabIndex,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        onLazyLoad = null,
        onScrollIndexChange = null,
        onScroll = null,
        ..._restProps
    }: VirtualScrollerProps = $props()

    //export let onScrollIndexChange: LazyLoadCallback | null = null
    //export let onScroll: ((event: Event) => void) | null = null

    let _props: VirtualScrollerProps = $derived({
        appendOnly,
        autoSize,
        class: className,
        columns,
        delay,
        disabled,
        id,
        inline,
        items,
        itemSize,
        lazy,
        loaderDisabled,
        loading,
        loadingIcon,
        numToleratedItems,
        orientation,
        resizeDelay,
        scrollHeight,
        scrollWidth,
        showLoader,
        showSpacer,
        step,
        tabIndex,
        pt,
        ptOptions,
        style,
        onLazyLoad,
        onScrollIndexChange,
        onScroll
    })

    export const displayName = 'VirtualScroller'
    export function getElement(): HTMLDivElement | null {
        return rootEl
    }
    export function getSpacerElement(): HTMLDivElement | null {
        return spacerEl
    }
    export function getStickyElement(): HTMLDivElement | null {
        return stickyEl
    }
    export function getContentElement(): HTMLElement | null {
        return contentEl
    }
    export function getHandler() {
        return {
            props: _props,
            getElement,
            scrollTo,
            scrollToIndex,
            scrollInView,
            getRenderedRange
        }
    }

    let rootEl: HTMLDivElement | null = null //const elementRef = React.useRef(null);
    let contentEl: HTMLElement | null = null
    let spacerEl: HTMLDivElement | null = null
    let stickyEl: HTMLDivElement | null = null

    let currentItems: Items | null = null
    let previousLoading: boolean = false
    let previousItems: Items | null = null

    let loadingState: boolean = $state(false)
    let numToleratedItemsState: number | number[] = $state(0)
    let pageState: number = $state(0)
    let loaderArrState: undefined[] | (undefined[] | undefined)[] = $state([])
    let firstState: InnerState = $state(orientation === 'both' ? { rows: 0, cols: 0 } : 0)
    let lastState: InnerState = $state(0)
    let numItemsInViewportState: InnerState = $state(0)
    let lazyLoadState: { first: InnerState; last: InnerState } | null = $state(null)
    let contentStyle: CssObject = $state({})
    let spacerStyle: CssObject = $state({})

    let lastScrollPos: ScrollPos = $state(0)
    let scrollTimeout: TimeoutId = $state(null)
    let resizeTimeout: TimeoutId = $state(null)
    let defaultWidth: number | null = $state(null)
    let defaultHeight: number | null = $state(null)
    let defaultContentWidth: number | null = $state(null)
    let defaultContentHeight: number | null = $state(null)
    let isItemRangeChanged: boolean = $state(false)
    let currentLoading: boolean = $state(false)

    let vertical = $derived(orientation === 'vertical')
    let horizontal = $derived(orientation === 'horizontal')
    let both = $derived(orientation === 'both')
    let loadedItems: any[] | any[][] = $derived(
        computeLoadItems({
            items,
            loadingState,
            both,
            appendOnly,
            firstState,
            lastState,
            horizontal,
            columns
        })
    )
    let itemsForLoadingSnippet = $derived(
        loaderArrState.map((_, index) => {
            return loaderOptions(index, both ? { numCols: bothState(numItemsInViewportState).cols } : undefined)
        })
    )
    let itemsForItemSnippet = $derived(
        loadedItems.map((item, index) => ({
            item,
            options: getOptions(index)
        })) || []
    )

    let ptContext: VirtualScrollerPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        state: {
            first: firstState,
            last: lastState,
            page: pageState,
            numItemsInViewport: numItemsInViewportState,
            numToleratedItems: numToleratedItemsState,
            loading: loadingState,
            loaderArr: loaderArrState
        },
        //context: {},
        ptOptions,
        unstyled: false
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    'p-virtualscroller',
                    className,
                    {
                        'p-virtualscroller-inline': inline,
                        'p-virtualscroller-both p-both-scroll': both,
                        'p-virtualscroller-horizontal p-horizontal-scroll': horizontal
                    }
                ],
                style,
                'data-pc-name': 'virtualScroller',
                'data-pc-section': 'root',
                tabindex: tabIndex
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "content" element
    let contentAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-virtualscroller-content',
                    {
                        'p-virtualscroller-loading': loadingState
                    }
                ],
                'data-pc-section': 'content',
                style: contentStyle
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "loader" element
    let loaderAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-virtualscroller-loader',
                    {
                        'p-component-overlay': loadingSnippet
                    }
                ],
                'data-pc-section': 'loader'
            },
            pt?.loader,
            globalPt?.loader,
            ptContext
        )
    )

    // "spacer" element
    let spacerAttributes = $derived(
        showSpacer
            ? resolveDivPt(
                  {
                      class: [],
                      'data-pc-section': 'spacer',
                      style: spacerStyle
                  },
                  pt?.spacer,
                  globalPt?.spacer,
                  ptContext
              )
            : null
    )

    // "loadingIcon" element
    let resolvedLoadingIcon = $derived(
        resolveIconPT(
            loadingIcon,
            {
                class: ['p-virtualscroller-spacer', 'p-icon-spin', 'pi', 'p-icon']
            },
            pt?.loadingIcon,
            globalPt?.loadingIcon,
            ptContext
        )
    )

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
        return Math.floor((first + simpleSize(numToleratedItemsState) * 4) / (step || 1))
    }

    function setContentElement(element?: HTMLElement | null): void {
        contentEl = element || findSingleEl(rootEl, '.p-virtualscroller-content')
    }

    function isPageChanged(first: number): boolean {
        return step ? pageState !== getPageByFirst(first) : true
    }

    export function scrollTo(options: ScrollToOptions): void {
        lastScrollPos = both ? { top: 0, left: 0 } : 0
        rootEl?.scrollTo(options)
    }

    export function scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto'): void {
        const { newNumToleratedItems } = calculateNumItems()
        const contentPos = getContentPosition(contentEl)
        const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior })
        let newFirst = both ? { rows: 0, cols: 0 } : 0
        let isRangeChanged = false

        if (both) {
            newFirst = {
                rows: calculateFirst(bothSize(index)[0], bothSize(newNumToleratedItems)[0]),
                cols: calculateFirst(bothSize(index)[1], bothSize(newNumToleratedItems)[1])
            }
            scrollToItem(
                calculateCoord(newFirst.cols, bothSize(itemSize)[1], contentPos.left),
                calculateCoord(newFirst.rows, bothSize(itemSize)[0], contentPos.top)
            )
            isRangeChanged = bothState(firstState).rows !== newFirst.rows || bothState(firstState).cols !== newFirst.cols
        } else {
            newFirst = calculateFirst(simpleSize(index), simpleSize(newNumToleratedItems))
            horizontal
                ? scrollToItem(calculateCoord(newFirst, simpleSize(itemSize), contentPos.left), 0)
                : scrollToItem(0, calculateCoord(newFirst, simpleSize(itemSize), contentPos.top))
            isRangeChanged = firstState !== newFirst
        }

        isItemRangeChanged = isRangeChanged
        firstState = newFirst
    }

    export function scrollInView(index: number | number[], to: 'to-start' | 'to-end', behavior: ScrollBehavior = 'auto'): void {
        if (!to) {
            scrollToIndex(index, behavior)
            return
        }
        const { first, viewport } = getRenderedRange()
        const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior })
        const isToStart = to === 'to-start'
        const isToEnd = to === 'to-end'
        const bothViewportFirst = bothState(viewport.first)
        const bothViewportLast = bothState(viewport.last)
        const simpleViewportFirst = simpleState(viewport.first)
        const simpleViewportLast = simpleState(viewport.last)

        if (isToStart) {
            if (both) {
                if (bothViewportFirst.rows - bothState(first).rows > bothSize(index)[0]) {
                    scrollToItem(
                        bothViewportFirst.cols * bothSize(itemSize)[1],
                        (bothViewportFirst.rows - 1) * bothSize(itemSize)[0]
                    )
                } else if (bothViewportFirst.cols - bothState(first).cols > bothSize(index)[1]) {
                    scrollToItem(
                        (bothViewportFirst.cols - 1) * bothSize(itemSize)[1],
                        bothViewportFirst.rows * bothSize(itemSize)[0]
                    )
                }
            } else if (simpleViewportFirst - simpleState(first) > simpleSize(index)) {
                const pos = (simpleViewportFirst - 1) * simpleSize(itemSize)
                horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos)
            }
        } else if (isToEnd) {
            if (both) {
                if (bothViewportLast.rows - bothState(first).rows <= bothSize(index)[0] + 1) {
                    scrollToItem(
                        bothViewportFirst.cols * bothSize(itemSize)[1],
                        (bothViewportFirst.rows + 1) * bothSize(itemSize)[0]
                    )
                } else if (bothViewportLast.cols - bothState(first).cols <= bothSize(index)[1] + 1) {
                    scrollToItem(
                        (bothViewportFirst.cols + 1) * bothSize(itemSize)[1],
                        bothViewportFirst.rows * bothSize(itemSize)[0]
                    )
                }
            } else if (simpleViewportLast - simpleState(first) <= simpleSize(index) + 1) {
                const pos = (simpleViewportFirst + 1) * simpleSize(itemSize)
                horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos)
            }
        }
    }

    function getRows(): any[] | any[][] {
        return loadingState ? (loaderDisabled ? loaderArrState : []) : loadedItems
    }

    function getColumns(): any[] | any[][] | undefined {
        if ((columns && both) || horizontal) {
            return loadingState && loaderDisabled
                ? both
                    ? loaderArrState[0]
                    : loaderArrState
                : (columns as Columns).slice(
                      both ? bothState(firstState).cols : simpleState(firstState),
                      both ? bothState(lastState).cols : simpleState(lastState)
                  )
        }

        return columns || undefined
    }

    export function getRenderedRange(): VirtualScrollerRenderedRange {
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

    function calculateNumItems() {
        const contentPos = getContentPosition(contentEl)
        const contentWidth = rootEl ? rootEl.offsetWidth - contentPos.left : 0
        const contentHeight = rootEl ? rootEl.offsetHeight - contentPos.top : 0
        const calculateNumItemsInViewport = (_contentSize: number, _itemSize: number) =>
            Math.ceil(_contentSize / (_itemSize || _contentSize))
        const calculateNumToleratedItems = (_numItems: number) => Math.ceil(_numItems / 2)
        const newNumItemsInViewport: InnerBothState | number = both
            ? {
                  rows: calculateNumItemsInViewport(contentHeight, bothSize(itemSize)[0]),
                  cols: calculateNumItemsInViewport(contentWidth, bothSize(itemSize)[1])
              }
            : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, simpleSize(itemSize))

        const newNumToleratedItems: number[] | number =
            numToleratedItemsState ||
            (both
                ? [
                      calculateNumToleratedItems(bothState(newNumItemsInViewport).rows),
                      calculateNumToleratedItems(bothState(newNumItemsInViewport).cols)
                  ]
                : calculateNumToleratedItems(simpleState(newNumItemsInViewport)))

        return { newNumItemsInViewport, newNumToleratedItems }
    }

    function calculateOptions() {
        const { newNumItemsInViewport, newNumToleratedItems } = calculateNumItems()
        const calculateLast = (_first: number, _num: number, _numT: number, _isCols = false) =>
            getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols)
        const last = both
            ? {
                  rows: calculateLast(
                      bothState(firstState).rows,
                      bothState(newNumItemsInViewport).rows,
                      bothSize(newNumToleratedItems)[0]
                  ),
                  cols: calculateLast(
                      bothState(firstState).cols,
                      bothState(newNumItemsInViewport).cols,
                      bothSize(newNumToleratedItems)[1],
                      true
                  )
              }
            : calculateLast(simpleState(firstState), simpleState(newNumItemsInViewport), simpleSize(newNumToleratedItems))

        numItemsInViewportState = newNumItemsInViewport
        numToleratedItemsState = newNumToleratedItems
        lastState = last

        if (showLoader) {
            loaderArrState = both
                ? Array.from({ length: bothState(newNumItemsInViewport).rows }).map(() =>
                      Array.from({ length: bothState(newNumItemsInViewport).cols })
                  )
                : Array.from({ length: simpleState(newNumItemsInViewport) })
        }

        if (lazy) {
            Promise.resolve().then(() => {
                const onLazyLoadProps = {
                    first: step ? (both ? { rows: 0, cols: bothState(firstState).cols } : 0) : firstState,
                    last: Math.min(step ? simpleState(step) : simpleState(last), (items || []).length)
                }
                onLazyLoad && onLazyLoad(onLazyLoadProps)
            })
        }
    }

    function calculateAutoSize(isLoading: boolean): void {
        if (autoSize && !isLoading && defaultWidth !== null && defaultHeight != null) {
            Promise.resolve().then(() => {
                if (contentEl && rootEl && defaultWidth !== null && defaultHeight != null) {
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

    function onScrollPositionChange(event: Event) {
        const target = event.target
        const contentPos = getContentPosition(contentEl)
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

        const scrollTop = calculateScrollPos((target as HTMLElement).scrollTop, contentPos.top)
        const scrollLeft = calculateScrollPos((target as HTMLElement).scrollLeft, contentPos.left)

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
                    simpleSize(numToleratedItemsState),
                    isScrollDownOrRight
                )

                newFirst = calculateFirst(
                    currentIndex,
                    triggerIndex,
                    simpleState(firstState),
                    simpleState(lastState),
                    simpleState(numItemsInViewportState),
                    simpleSize(numToleratedItemsState),
                    isScrollDownOrRight
                )
                newLast = calculateLast(
                    currentIndex,
                    newFirst,
                    simpleState(lastState),
                    simpleState(numItemsInViewportState),
                    simpleSize(numToleratedItemsState),
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
            if (rootEl && numToleratedItems !== null) {
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
            _props
        }
    }

    function loaderOptions(index: number, extOptions?: { numCols?: number }): VirtualScrollerLoadingSnippetOptions {
        const count = loaderArrState.length || 0

        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            _props,
            ...extOptions
        }
    }

    function init() {
        if (!disabled) {
            updateRootElSize({
                rootEl,
                scrollWidth,
                scrollHeight,
                horizontal,
                both
            })
            calculateOptions()
            spacerStyle = compueSpacerSize({
                contentEl,
                items,
                both,
                columns,
                horizontal,
                itemSize
            })
        }
    }

    onMount(() => {
        if (rootEl && isVisible(rootEl)) {
            setContentElement(contentEl)
            init()

            defaultWidth = getWidth(rootEl)
            defaultHeight = getHeight(rootEl)
            defaultContentWidth = getWidth(contentEl)
            defaultContentHeight = getHeight(contentEl)
        }
    })

    // Update lastScrollPos,firstState and lastState when both (orientation) change
    $effect(() => {
        if (both !== undefined) {
            lastScrollPos = both ? { top: 0, left: 0 } : 0
            firstState = both ? { rows: 0, cols: 0 } : 0
            lastState = both ? { rows: 0, cols: 0 } : 0
            numItemsInViewportState = both ? { rows: 0, cols: 0 } : 0
        }
    })
    $effect(() => {
        if (loading !== undefined) loadingState = loading
    })

    $effect(() => {
        if (numToleratedItems !== numToleratedItemsState) {
            numToleratedItems = numToleratedItemsState
            init() // reinit after resizing
        }
    })

    $effect(() => {
        console.log('effect : previous items')
        previousItems = currentItems
        currentItems = items
    })
    $effect(() => {
        console.log('effect : previous loading')
        previousLoading = currentLoading
        currentLoading = loading
    })

    $effect(() => {
        // Check if the previous/current rows array exists
        const prevRowsExist = !!previousItems
        const currentRowsExist = items !== undefined && items !== null

        // Get the length of the previous/current rows array, or 0 if it doesn't exist
        const prevRowsLength = previousItems?.length || 0
        const currentRowsLength = currentRowsExist ? items?.length ?? 0 : 0

        // Check if the length of the rows arrays has changed
        let valuesChanged = prevRowsLength !== currentRowsLength

        // If both is true, we also need to check the lengths of the first element (assuming it's a matrix)
        if (both && !valuesChanged) {
            // Get the length of the columns or 0
            const prevColumnsLength = previousItems?.[0]?.length || 0
            const currentColumnsLength = currentRowsExist && (items?.length ?? 0) > 0 ? items?.[0].length ?? 0 : 0

            // Check if the length of the columns has changed
            valuesChanged = prevColumnsLength !== currentColumnsLength
        }

        // If the previous items array doesn't exist or if any values have changed, call the init function
        if (!prevRowsExist || valuesChanged) {
            init()
        }

        let isLoading = loadingState

        if (lazy && previousLoading !== loading && loading !== loadingState) {
            loadingState = loading
            isLoading = loading
        }

        calculateAutoSize(isLoading)
    })

    function contentSnippetOptions() {
        return {
            style: contentStyle,
            className,
            spacerStyle: spacerStyle,
            contentRef: (el: HTMLElement) => (contentEl = el),
            spacerRef: (el: HTMLDivElement) => (spacerEl = el),
            stickyRef: (el: HTMLDivElement) => (stickyEl = el),
            items: loadedItems,
            getItemOptions: (index: number) => getOptions(index),
            children: items,
            //element: content,
            props: _props,
            loading: loadingState,
            getLoaderOptions: (index: number, ext?: { numCols?: number }) => loaderOptions(index, ext),
            //loadingTemplate: props.loadingTemplate,
            itemSize,
            rows: getRows(),
            columns: getColumns(),
            vertical,
            horizontal,
            both
        }
    }
</script>

{#if disabled}
    {#if children}
        {@render children()}
    {/if}
    {#if contentSnippet}
        {@render contentSnippet({ options: contentSnippetOptions() })}
    {/if}
{:else}
    <div
        bind:this={rootEl}
        {...rootAttributes}
        {..._restProps}
        onscroll={_onScroll}
        use:windowEvents={{ resize: onResize, windoworientationchange: onResize }}
    >
        {#if !loaderDisabled && showLoader && loadingState}
            <div {...loaderAttributes}>
                {#if loadingSnippet}
                    {#each itemsForLoadingSnippet as options (options.index)}
                        {@render loadingSnippet({ options })}
                    {/each}
                {:else}
                    <IconBuilder resolvedIcon={resolvedLoadingIcon} spin={true} />
                {/if}
            </div>
        {/if}
        {#if contentSnippet}
            {@render contentSnippet({ options: contentSnippetOptions() })}
        {:else if itemSnippet}
            <div {...contentAttributes}>
                {#each itemsForItemSnippet as slotItem (slotItem.options.index)}
                    {@render itemSnippet({ item: slotItem.item, options: slotItem.options })}
                {/each}
            </div>
        {/if}
        {#if showSpacer}
            <div bind:this={spacerEl} {...spacerAttributes}></div>
        {/if}
    </div>
{/if}

<style>
    .p-virtualscroller {
        position: relative;
        overflow: auto;
        contain: strict;
        transform: translateZ(0);
        will-change: scroll-position;
        outline: 0 none;
    }

    .p-virtualscroller-content {
        position: absolute;
        top: 0;
        left: 0;
        /*contain: content;*/
        min-height: 100%;
        min-width: 100%;
        will-change: transform;
    }

    .p-virtualscroller-spacer {
        position: absolute;
        top: 0;
        left: 0;
        height: 1px;
        width: 1px;
        transform-origin: 0 0;
        pointer-events: none;
    }

    .p-virtualscroller-loader {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-virtualscroller-loader.p-component-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-virtualscroller-loading-icon {
        font-size: 2rem;
    }

    .p-virtualscroller-horizontal > .p-virtualscroller-content {
        display: flex;
    }

    /* Inline */
    .p-virtualscroller-inline .p-virtualscroller-content {
        position: static;
    }
</style>

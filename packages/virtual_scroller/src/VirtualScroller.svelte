<script lang="ts">
    import type {
        VirtualScrollerPassThroughMethodOptions,
        VirtualScrollerPassThroughOptions,
        VirtualScrollerOrientation,
        InnerBothState,
        InnerState,
        LazyLoadState,
        LazyLoadCallback
    } from './virtualScroller.types'

    import type {
        HTMLDivAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions,
        TimeoutId,
        CssObject
    } from '@jazzsvelte/api'
    import { afterUpdate, onMount } from 'svelte'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultVirtualScrollerProps as DEFAULT, globalVirtualScrollerPT as globalPt } from './virtualScroller.config'
    import { getHeight, getWidth, isVisible, findSingleEl } from '@jazzsvelte/dom'
    import { windowEvents } from '@jazzsvelte/window_events_action'
    import { deepEquals } from '@jazzsvelte/object'

    type BothScrollPos = { top: number; left: number }
    type ScrollPos = BothScrollPos | number
    type Columns = any[]
    type Items = any[] | any[][]

    export let appendOnly: boolean = DEFAULT.appendOnly
    export let autoSize: boolean = DEFAULT.autoSize
    export let columns: Columns | null = DEFAULT.columns
    export let delay: number = DEFAULT.delay
    export let disabled: boolean = DEFAULT.disabled
    export let id: string | null = DEFAULT.id
    export let inline: boolean = DEFAULT.inline
    export let items: Items | null = DEFAULT.items
    export let itemSize: number | number[]
    export let lazy: boolean = DEFAULT.lazy
    export let loaderDisabled: boolean = DEFAULT.loaderDisabled
    export let loading: boolean = DEFAULT.loading
    export let loadingIcon: string | IconComponent | null = DEFAULT.loadingIcon
    export let numToleratedItems: number | number[] | null = DEFAULT.numToleratedItems
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
    export let onLazyLoad: LazyLoadCallback | null = null
    export let onScrollIndexChange: LazyLoadCallback | null = null
    export let onScroll: ((event: Event) => void) | null = null

    export const displayName = 'VirtualScroller'
    export function getElement(): HTMLDivElement | null {
        return rootEl
    }
    export function getHandler() {
        return {
            props: $$props,
            getElement,
            scrollTo,
            scrollToIndex,
            scrollInView,
            getRenderedRange
        }
    }

    $: ptContext = {
        props: $$props,
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
    } satisfies VirtualScrollerPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
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
    ) satisfies HTMLDivAttributes

    // "content" element
    $: contentAttributes = resolvePT(
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
    ) satisfies HTMLDivAttributes

    // "loader" element
    $: loaderAttributes = resolvePT(
        {
            class: [
                'p-virtualscroller-loader',
                {
                    'p-component-overlay': !$$slots.loading
                }
            ],
            'data-pc-section': 'loader'
        },
        pt?.loader,
        globalPt?.loader,
        ptContext
    ) satisfies HTMLDivAttributes

    // "spacer" element
    $: spacerAttributes = (
        showSpacer
            ? resolvePT(
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
    ) satisfies HTMLDivAttributes | null

    // "loadingIcon" element
    $: resolvedLoadingIcon = resolveIconPT(
        loadingIcon,
        {
            class: ['p-virtualscroller-spacer', 'p-icon-spin', 'pi', 'p-icon']
        },
        pt?.loadingIcon,
        globalPt?.loadingIcon,
        ptContext
    ) satisfies ResolvedIconPT

    $: vertical = (orientation === 'vertical') satisfies boolean
    $: horizontal = (orientation === 'horizontal') satisfies boolean
    $: both = (orientation === 'both') satisfies boolean
    let loadingState: boolean = false
    let numToleratedItemsState: number | number[] = 0
    let pageState: number = 0
    let loaderArrState: undefined[] | (undefined[] | undefined)[] = []
    let firstState: InnerState = 0
    let lastState: InnerState = 0
    let numItemsInViewportState: InnerState = 0

    let rootEl: HTMLDivElement | null = null //const elementRef = React.useRef(null);
    let contentEl: HTMLElement | null = null
    let spacerEl: HTMLDivElement | null = null
    let stickyEl: HTMLDivElement | null = null
    let lastScrollPos: ScrollPos = 0
    let scrollTimeout: TimeoutId = null
    let resizeTimeout: TimeoutId = null
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
        return Math.floor((first + simpleSize(numToleratedItemsState) * 4) / (step || 1))
    }

    function setContentElement(element?: HTMLElement | null): void {
        contentEl = element || findSingleEl(rootEl, '.p-virtualscroller-content')
    }

    function isPageChanged(first: number): boolean {
        return step ? pageState !== getPageByFirst(first) : true
    }

    function scrollTo(options: ScrollToOptions): void {
        lastScrollPos = both ? { top: 0, left: 0 } : 0
        rootEl?.scrollTo(options)
    }

    function scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto'): void {
        console.log('scrollToIndex')
        const { numToleratedItems } = calculateNumItems()
        const contentPos = getContentPosition()
        const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior })
        let newFirst = both ? { rows: 0, cols: 0 } : 0
        let isRangeChanged = false

        if (both) {
            newFirst = {
                rows: calculateFirst(bothSize(index)[0], bothSize(numToleratedItems)[0]),
                cols: calculateFirst(bothSize(index)[1], bothSize(numToleratedItems)[1])
            }
            scrollToItem(
                calculateCoord(newFirst.cols, bothSize(itemSize)[1], contentPos.left),
                calculateCoord(newFirst.rows, bothSize(itemSize)[0], contentPos.top)
            )
            isRangeChanged = bothState(firstState).rows !== newFirst.rows || bothState(firstState).cols !== newFirst.cols
        } else {
            newFirst = calculateFirst(simpleSize(index), simpleSize(numToleratedItems))
            horizontal
                ? scrollToItem(calculateCoord(newFirst, simpleSize(itemSize), contentPos.left), 0)
                : scrollToItem(0, calculateCoord(newFirst, simpleSize(itemSize), contentPos.top))
            isRangeChanged = firstState !== newFirst
        }

        isItemRangeChanged = isRangeChanged
        firstState = newFirst
    }

    function scrollInView(index: number | number[], to: 'to-start' | 'to-end', behavior: ScrollBehavior = 'auto'): void {
        console.log('scrollInView')
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

    function calculateNumItems() {
        const contentPos = getContentPosition()
        const contentWidth = rootEl ? rootEl.offsetWidth - contentPos.left : 0
        const contentHeight = rootEl ? rootEl.offsetHeight - contentPos.top : 0
        const calculateNumItemsInViewport = (_contentSize: number, _itemSize: number) =>
            Math.ceil(_contentSize / (_itemSize || _contentSize))
        const calculateNumToleratedItems = (_numItems: number) => Math.ceil(_numItems / 2)
        const numItemsInViewport: InnerBothState | number = both
            ? {
                  rows: calculateNumItemsInViewport(contentHeight, bothSize(itemSize)[0]),
                  cols: calculateNumItemsInViewport(contentWidth, bothSize(itemSize)[1])
              }
            : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, simpleSize(itemSize))

        const numToleratedItems: number[] | number =
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
        console.log('calculateOptions ' + firstState + ' ' + numItemsInViewport + ' ' + numToleratedItems)
        const calculateLast = (_first: number, _num: number, _numT: number, _isCols = false) =>
            getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols)
        const last = both
            ? {
                  rows: calculateLast(
                      bothState(firstState).rows,
                      bothState(numItemsInViewport).rows,
                      bothSize(numToleratedItems)[0]
                  ),
                  cols: calculateLast(
                      bothState(firstState).cols,
                      bothState(numItemsInViewport).cols,
                      bothSize(numToleratedItems)[1],
                      true
                  )
              }
            : calculateLast(simpleState(firstState), simpleState(numItemsInViewport), simpleSize(numToleratedItems))

        numItemsInViewportState = numItemsInViewport
        numToleratedItemsState = numToleratedItems
        lastState = last

        if (showLoader) {
            loaderArrState = both
                ? Array.from({ length: bothState(numItemsInViewport).rows }).map(() =>
                      Array.from({ length: bothState(numItemsInViewport).cols })
                  )
                : Array.from({ length: simpleState(numItemsInViewport) })
        }

        if (lazy) {
            Promise.resolve().then(() => {
                const lazyLoadState = {
                    first: step ? (both ? { rows: 0, cols: bothState(firstState).cols } : 0) : firstState,
                    last: Math.min(step ? simpleState(step) : simpleState(last), (items || []).length)
                }
                onLazyLoad && onLazyLoad(lazyLoadState)
            })
        }
    }

    function calculateAutoSize(loading: boolean): void {
        if (autoSize && !loading && defaultWidth !== null && defaultHeight != null) {
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

    function onScrollPositionChange(event: Event) {
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
            console.log('Calculate First ' + _numT)
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
            console.log('Calculate Last ' + _numT)

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

        console.log('first ' + first + ' last ' + last + ' isRangeChanged ' + isRangeChanged)

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
        console.log('onScroll')
        onScroll?.(event)

        if (delay) {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }

            if (isPageChanged(simpleState(firstState))) {
                if (!loadingState && showLoader) {
                    const { isRangeChanged } = onScrollPositionChange(event)
                    const changed = isRangeChanged || (step ? isPageChanged(simpleState(firstState)) : false)

                    console.log('====== _onScroll set loadingState to true = ' + changed)
                    changed && (loadingState = true)
                }

                console.log('Scroll Timeout call')
                scrollTimeout = setTimeout(() => {
                    console.log('Scroll Timeout exec')
                    onScrollChange(event)

                    if (loadingState && showLoader && (!lazy || loading === undefined)) {
                        console.log('====== _onScroll set loadingState to false ')
                        loadingState = false
                        pageState = getPageByFirst(simpleState(firstState))
                    }
                }, delay)
            }
        } else {
            console.log('Scroll exec')
            onScrollChange(event)
        }
    }

    function onResize() {
        console.log('Resize Timeout call')

        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
        }

        resizeTimeout = setTimeout(() => {
            console.log('Resize Timeout exec')
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

    let loadedItems: any[] | any[][] = []
    $: {
        console.log('loadedItems')

        if (!items || loadingState) {
            loadedItems = []
        } else if (both) {
            loadedItems = items
                .slice(appendOnly ? 0 : bothState(firstState).rows, bothState(lastState).rows)
                .map((item) =>
                    columns ? item : item.slice(appendOnly ? 0 : bothState(firstState).cols, bothState(lastState).cols)
                )
        } else if (!horizontal || !columns) {
            console.log('loadedItems ' + simpleState(firstState) + ' ' + simpleState(lastState))
            loadedItems = items.slice(appendOnly ? 0 : simpleState(firstState), simpleState(lastState))
        }
    }

    function viewInit() {
        console.log('viewInit')
        if (rootEl && isVisible(rootEl)) {
            setContentElement(contentEl)
            init()

            defaultWidth = getWidth(rootEl)
            defaultHeight = getHeight(rootEl)
            defaultContentWidth = getWidth(contentEl)
            defaultContentHeight = getHeight(contentEl)
        }
    }

    function init() {
        console.log('init')
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

    let currentItems: Items | null = null
    let previousItems: Items | null = null
    $: {
        previousItems = currentItems
        currentItems = items
    }
    let currentLoading: boolean = false
    let previousLoading: boolean = false
    $: {
        previousLoading = currentLoading
        currentLoading = loading
    }

    afterUpdate(() => {
        console.log('afterUpdate')
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

        let _loading = loadingState

        if (lazy && previousLoading !== loading && loading !== loadingState) {
            console.log('After update loadingState ' + loading)
            loadingState = loading
            _loading = loading
        }

        calculateAutoSize(_loading)
    })

    $: slotLoadingItems = loaderArrState.map((_, index) => {
        return loaderOptions(index, both && { numCols: bothState(numItemsInViewportState).cols })
    })

    $: slotItemItems =
        loadedItems.map((item, index) => ({
            item,
            options: getOptions(index)
        })) || []

    function slotContentOptions() {
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
            props: $$props,
            loading: loadingState,
            getLoaderOptions: (index: number, ext: any) => loaderOptions(index, ext),
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
    <slot />
    {#if $$slots.content}
        <slot name="content" />
    {/if}
{:else}
    <div
        bind:this={rootEl}
        {...rootAttributes}
        {...$$restProps}
        on:scroll={_onScroll}
        use:windowEvents={{ resize: onResize, windoworientationchange: onResize }}
    >
        {#if !loaderDisabled && showLoader && loadingState}
            <div {...loaderAttributes}>
                {#if $$slots.loading}
                    {#each slotLoadingItems as options (options.index)}
                        <slot name="loading" {options} />
                    {/each}
                {:else}
                    <IconBuilder resolvedIcon={resolvedLoadingIcon} spin={true} />
                {/if}
            </div>
        {/if}
        {#if $$slots.content}
            <slot name="content" options={slotContentOptions()} />
        {:else}
            <div {...contentAttributes}>
                {#each slotItemItems as slotItem (slotItem.options.index)}
                    <slot name="item" item={slotItem.item} options={slotItem.options} />
                {/each}
            </div>
        {/if}
        {#if showSpacer}
            <div bind:this={spacerEl} {...spacerAttributes} />
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

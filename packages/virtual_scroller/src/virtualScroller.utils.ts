import type { CssObject } from '@jazzsvelte/api'
import type {
    BothScrollPos,
    InnerBothState,
    InnerState,
    ScrollPos,
    VirtualScrollerColumns,
    VirtualScrollerItems
} from './virtualScroller.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Items = any[] | any[][]

export function bothState(state: InnerState): InnerBothState {
    return state as InnerBothState
}

export function simpleState(state: InnerState): number {
    return state as number
}
export function bothPos(pos: ScrollPos): BothScrollPos {
    return pos as BothScrollPos
}

export function simplePos(pos: ScrollPos): number {
    return pos as number
}

export function bothSize(size: number | number[]): number[] {
    return size as number[]
}
export function simpleSize(size: number | number[]): number {
    return size as number
}

export function computeLoadItems({
    items,
    loadingState,
    both,
    appendOnly,
    firstState,
    lastState,
    horizontal,
    columns
}: {
    items: VirtualScrollerItems
    loadingState: boolean
    both: boolean
    appendOnly: boolean
    firstState: InnerState
    lastState: InnerState
    horizontal: boolean
    columns: VirtualScrollerColumns
}) {
    if (!items || loadingState || !lastState) {
        return []
    }
    if (both) {
        return items
            .slice(appendOnly ? 0 : bothState(firstState).rows, bothState(lastState).rows)
            .map((item) => (columns ? item : item.slice(appendOnly ? 0 : bothState(firstState).cols, bothState(lastState).cols)))
    }
    if (!horizontal || !columns) {
        return items.slice(appendOnly ? 0 : simpleState(firstState), simpleState(lastState))
    }
    return []
}

export function updateRootElSize({
    rootEl,
    scrollWidth,
    scrollHeight,
    horizontal,
    both
}: {
    rootEl: HTMLDivElement | null
    scrollWidth: string | null
    scrollHeight: string | null
    horizontal: boolean
    both: boolean
}) {
    if (rootEl) {
        const parentElement = rootEl.parentElement
        const width = scrollWidth || `${rootEl.offsetWidth || parentElement?.offsetWidth}px`
        const height = scrollHeight || `${rootEl.offsetHeight || parentElement?.offsetHeight}px`

        if (both || horizontal) {
            rootEl.style.height = height
            rootEl.style.width = width
        } else {
            rootEl.style.height = height
        }
    }
}

export function getContentPosition(contentEl: HTMLElement | null) {
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

export function compueSpacerSize({
    contentEl,
    items,
    both,
    columns,
    horizontal,
    itemSize
}: {
    contentEl: HTMLElement | null
    items: VirtualScrollerItems
    both: boolean
    columns: VirtualScrollerColumns
    horizontal: boolean
    itemSize: number | number[]
}) {
    const style: CssObject = {}
    if (items) {
        const contentPos = getContentPosition(contentEl)
        const setProp = (_name: 'width' | 'height', _value: Items, _size: number, _cpos = 0) => {
            style[_name] = (_value || []).length * _size + _cpos + 'px'
        }

        if (both) {
            setProp('height', items, bothSize(itemSize)[0], contentPos.y)
            setProp('width', columns || items[1], bothSize(itemSize)[1], contentPos.x)
        } else {
            horizontal
                ? setProp('width', columns || items, simpleSize(itemSize), contentPos.x)
                : setProp('height', items, simpleSize(itemSize), contentPos.y)
        }
    }
    return style
}

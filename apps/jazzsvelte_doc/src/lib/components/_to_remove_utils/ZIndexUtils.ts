import type { JazzSvelteContext, ZIndexOptions } from '../api/JazzSvelte.types'

type Entry = { key: string; value: number }

let zIndexes: Entry[] = []

function generateZIndex(key: string, autoZIndex: boolean, baseZIndex = 999): number {
    const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex)
    const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1

    zIndexes.unshift({ key, value: newZIndex }) // Unshift for find in getLastZIndex

    return newZIndex
}

function revertZIndex(zIndex: number) {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex)
}

function getLastZIndex(key: string, autoZIndex: boolean, baseZIndex = 0): Entry {
    return zIndexes.find((obj) => (autoZIndex ? true : obj.key === key)) || { key, value: baseZIndex }
}

export function getCurrentZIndex(key: string, autoZIndex: boolean): number {
    return getLastZIndex(key, autoZIndex).value
}

export function getZIndex(el?: HTMLElement): number {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0
}

export function setZIndex(key: keyof ZIndexOptions | string, el: HTMLElement, { autoZIndex, zIndex }: JazzSvelteContext): void {
    const baseZIndex = zIndex?.[key as keyof ZIndexOptions]
    if (el) {
        el.style.zIndex = String(generateZIndex(key, !!autoZIndex, baseZIndex))
    }
}

export function clearZIndex(el: HTMLElement): void {
    if (el) {
        revertZIndex(getZIndex(el))
        el.style.zIndex = ''
    }
}

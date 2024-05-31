import type { ActionReturn } from 'svelte/action'
import type { JazzSvelteContext, ZIndexOptions } from './jazzSvelte.types'
import { JAZZ_SVELTE } from './JazzSvelte'

export type ZIndexActionOptions = {
    key: string
    jazzSvelteContext: JazzSvelteContext
}

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

function setZIndex(key: keyof ZIndexOptions | string, el: HTMLElement, context: JazzSvelteContext): void {
    const autoZIndex = context?.autoZIndex ?? JAZZ_SVELTE.autoZIndex
    const zIndex = context?.zIndex ?? JAZZ_SVELTE.zIndex
    const baseZIndex = zIndex?.[key as keyof ZIndexOptions]
    if (el) {
        el.style.zIndex = String(generateZIndex(key, !!autoZIndex, baseZIndex))
    }
}

function clearZIndex(el: HTMLElement): void {
    if (el) {
        revertZIndex(getZIndex(el))
        el.style.zIndex = ''
    }
}

export function getCurrentZIndex(key: string, autoZIndex: boolean): number {
    return getLastZIndex(key, autoZIndex).value
}

export function getZIndex(el?: HTMLElement): number {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0
}

/**
 * Action on element that set and remove zIndex for floatin component (tooltip, toast,..)
 * @param element
 * @param actionOptions
 * @returns
 */
export function zIndex(element: HTMLElement, { key, jazzSvelteContext }: ZIndexActionOptions): ActionReturn<ZIndexActionOptions> {
    setZIndex(key, element, jazzSvelteContext)

    return {
        destroy() {
            clearZIndex(element)
        }
    }
}

import type { ActionReturn } from 'svelte/action'

export type MountOptions = (el: HTMLElement) => void | (() => void)

interface Attributes {}

/**
 * Usage: <div use:mount={onMount}>
 *
 * @param {HTMLElement} el
 * @param {HTMLElement|string} target DOM Element or CSS Selector
 */
export function onMountElement(el: HTMLElement, onMount: MountOptions): ActionReturn<MountOptions, Attributes> {
    const unMount = onMount(el)
    return unMount
        ? {
              destroy: unMount
          }
        : {}
}

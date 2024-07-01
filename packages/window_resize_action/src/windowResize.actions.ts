import type { ActionReturn } from 'svelte/action'

export type ClickOutsideOptions = Record<string, never>

interface Attributes {
    'on:windowresize': (e: WindowResizeEvent) => void
}

export type WindowResizeEvent = CustomEvent<{ event: Event }>

/** Dispatch event on window resize */
export function windowResize(node: HTMLElement): ActionReturn<ClickOutsideOptions, Attributes> {
    const handleWindowResize = (event: Event) => {
        node.dispatchEvent(new CustomEvent('windowresize', event))
    }

    window.addEventListener('resize', handleWindowResize, true)

    return {
        destroy() {
            window.removeEventListener('resize', handleWindowResize, true)
        }
    }
}

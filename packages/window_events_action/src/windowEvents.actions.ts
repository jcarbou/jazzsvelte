import type { ActionReturn } from 'svelte/action'

type WindowEventHandler = (event: Event) => void

type Options = {
    resize?: WindowEventHandler
    windoworientationchange?: WindowEventHandler
}

/** Dispatch event on window resize or windoworientationchange */
export function windowEvents(node: HTMLElement, { resize, windoworientationchange }: Options): ActionReturn<Options> {
    resize && window.addEventListener('resize', resize, true)
    windoworientationchange && window.addEventListener('windoworientationchange', windoworientationchange, true)

    return {
        destroy() {
            resize && window.removeEventListener('resize', resize, true)
            windoworientationchange && window.removeEventListener('windoworientationchange', windoworientationchange, true)
        }
    }
}

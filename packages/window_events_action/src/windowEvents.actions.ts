import type { ActionReturn } from 'svelte/action'

type WindowEventHandler = (event: Event) => void

type Options = {
    resize?: WindowEventHandler
    scroll?: WindowEventHandler
    windoworientationchange?: WindowEventHandler
}

/** Dispatch event on window resize or windoworientationchange */
export function onMountWindowEvents({ resize, windoworientationchange, scroll }: Options): ActionReturn<Options> {
    resize && window.addEventListener('resize', resize, true)
    scroll && window.addEventListener('scroll', scroll, true)
    windoworientationchange && window.addEventListener('windoworientationchange', windoworientationchange, true)

    return {
        destroy() {
            resize && window.removeEventListener('resize', resize, true)
            scroll && window.removeEventListener('scroll', scroll, true)
            windoworientationchange && window.removeEventListener('windoworientationchange', windoworientationchange, true)
        }
    }
}

export function windowEvents(node: HTMLElement, options: Options): ActionReturn<Options> {
    return onMountWindowEvents(options)
}

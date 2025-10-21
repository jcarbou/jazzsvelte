import type { ActionReturn } from 'svelte/action'

type WindowEventHandler = (event: Event) => void

type Options = {
    resize?: WindowEventHandler
    scroll?: WindowEventHandler
    windoworientationchange?: WindowEventHandler
}

/** Dispatch event on window resize, scroll or windoworientationchange using svelte action */
export function windowEvents(node: HTMLElement, options: Options): ActionReturn<Options> {
    const destroy = onMountWindowEvents(options)

    return {
        destroy
    }
}

/** Dispatch event on window resize, scroll or windoworientationchange using svelte onMount */
export function onMountWindowEvents({ resize, windoworientationchange, scroll }: Options): () => void {
    resize && window.addEventListener('resize', resize, true)
    scroll && window.addEventListener('scroll', scroll, true)
    windoworientationchange && window.addEventListener('windoworientationchange', windoworientationchange, true)

    return () => {
        resize && window.removeEventListener('resize', resize, true)
        scroll && window.removeEventListener('scroll', scroll, true)
        windoworientationchange && window.removeEventListener('windoworientationchange', windoworientationchange, true)
    }
}

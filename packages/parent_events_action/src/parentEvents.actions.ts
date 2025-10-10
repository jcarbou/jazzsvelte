import type { ActionReturn } from 'svelte/action'

type ParentEventHandler = ({ event, parentElement }: { event: Event; parentElement: HTMLElement }) => void

type Options = {
    scroll?: ParentEventHandler
}

/** Dispatch event on node parent */
export function parentEvents(node: HTMLElement, { scroll }: Options): ActionReturn<Options> {
    if (!node.parentElement) return {}

    const parentElement = node.parentElement
    let scrollListener: null | ((ev: Event) => void) = null

    if (scroll) {
        scrollListener = (event: Event) => {
            scroll({ parentElement, event })
        }
        parentElement.addEventListener('scroll', scrollListener, true)
    }

    return {
        destroy() {
            scrollListener && parentElement.removeEventListener('scroll', scrollListener)
        }
    }
}

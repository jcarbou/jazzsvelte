import { ActionReturn } from 'svelte/action'

export type StopProgagationActionReturn = {
    eventName: string
    stopCondition?: (node: HTMLElement, event: Event) => boolean
}

/** Dispatch event on click outside of node */
export function stopProgagation(
    node: HTMLElement,
    { eventName, stopCondition }: StopProgagationActionReturn
): ActionReturn<StopProgagationActionReturn> {
    if (!stopCondition) return {}

    const handleEvent = (event: Event) => {
        if (stopCondition(node, event)) {
            event.stopPropagation()
            event.preventDefault()

            // Needed in order to stop propagation for listeners on the same element
            event.stopImmediatePropagation()
        }
    }

    node.addEventListener(eventName, handleEvent, true)

    return {
        destroy() {
            node.removeEventListener(eventName, handleEvent, true)
        }
    }
}

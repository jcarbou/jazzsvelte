import type { ActionReturn } from 'svelte/action'

export type ClickOutsideOptions = {
    getAdditionalElements?: () => (HTMLElement | null | undefined)[]
}

interface Attributes {
    'on:clickoutside': (e: ClickOutsideEvent) => void
}

export type ClickOutsideEvent = CustomEvent<{ event: Event }>

/** Dispatch event on click outside of node (or list of nodes) */
export function clickOutside(node: HTMLElement, options: ClickOutsideOptions): ActionReturn<ClickOutsideOptions, Attributes> {
    const handleClick = (event: MouseEvent) => {
        if (!(event.target instanceof HTMLElement) || event.defaultPrevented) {
            return
        }
        const target: HTMLElement = event.target,
            inElements: (HTMLElement | null | undefined)[] = [node],
            { getAdditionalElements } = options

        if (getAdditionalElements) {
            inElements.push(...getAdditionalElements())
        }
        if (!inElements.find((elementOrNull) => !!elementOrNull?.contains(target))) {
            node.dispatchEvent(new CustomEvent('clickoutside'))
        }
    }

    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true)
        }
    }
}

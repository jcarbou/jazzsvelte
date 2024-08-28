import type { ActionReturn } from 'svelte/action'

/**
 * Priorities of different components (bigger number handled first)
 */
export const ESC_KEY_HANDLING_PRIORITIES = {
    SIDEBAR: 100,
    SLIDE_MENU: 200,
    DIALOG: 300,
    IMAGE: 400,
    MENU: 500,
    OVERLAY_PANEL: 600,
    PASSWORD: 700,
    CASCADE_SELECT: 800,
    SPLIT_BUTTON: 900,
    SPEED_DIAL: 1000,
    TOOLTIP: 1200
}

type EscapePriority = [number, number]

export type EscapeOptions = {
    when?: boolean
    priority: EscapePriority
    handler: (event: Event) => void
}

export type EscapeEvent = CustomEvent<{ event: Event }>

/** add escape listener  */
export function escape(node: HTMLElement, options: EscapeOptions): ActionReturn<EscapeOptions> {
    if (options.when === false) {
        return {}
    }
    const { priority, handler } = options
    const destroy = globalEscKeyHandlingLogic.addListener(handler, priority)

    return {
        destroy
    }
}

/**
 * Object, that manages global escape key handling logic
 */
const globalEscKeyHandlingLogic = {
    /**
     * Mapping from ESC_KEY_HANDLING_PRIORITY to array of related listeners, grouped by priority
     * @example
     * Map<{
     *     [ESC_KEY_HANDLING_PRIORITIES.SIDEBAR]: Map<{
     *         1: () => {...},
     *         2: () => {...}
     *     }>,
     *     [ESC_KEY_HANDLING_PRIORITIES.DIALOG]: Map<{
     *         1: () => {...},
     *         2: () => {...}
     *     }>
     * }>;
     */
    escKeyListeners: new Map(),

    /**
     * Keydown handler (attached to any keydown)
     */
    onGlobalKeyDown(event: KeyboardEvent) {
        // Do nothing if not an "esc" key is pressed:
        if (event.code !== 'Escape') {
            return
        }

        const escKeyListeners = globalEscKeyHandlingLogic.escKeyListeners
        const maxPrimaryPriority = Math.max(...escKeyListeners.keys())
        const theMostImportantEscHandlersSet = escKeyListeners.get(maxPrimaryPriority)
        const maxSecondaryPriority = Math.max(...theMostImportantEscHandlersSet.keys())
        const theMostImportantEscHandler = theMostImportantEscHandlersSet.get(maxSecondaryPriority)

        theMostImportantEscHandler(event)
    },

    /**
     * Attach global keydown listener if there are any "esc" key handlers assigned,
     * otherwise detach.
     */
    refreshGlobalKeyDownListener() {
        if (this.escKeyListeners.size > 0) {
            document.addEventListener('keydown', this.onGlobalKeyDown)
        } else {
            document.removeEventListener('keydown', this.onGlobalKeyDown)
        }
    },

    /**
     * Add "Esc" key handler
     */
    addListener(callback: (event: Event) => void, [primaryPriority, secondaryPriority]: EscapePriority) {
        const escKeyListeners = this.escKeyListeners

        if (!escKeyListeners.has(primaryPriority)) {
            escKeyListeners.set(primaryPriority, new Map())
        }

        const primaryPriorityListeners = escKeyListeners.get(primaryPriority)

        // To prevent unexpected override of callback:
        if (primaryPriorityListeners.has(secondaryPriority)) {
            throw new Error(
                `Unexpected: global esc key listener with priority [${primaryPriority}, ${secondaryPriority}] already exists.`
            )
        }

        primaryPriorityListeners.set(secondaryPriority, callback)
        this.refreshGlobalKeyDownListener()

        return () => {
            primaryPriorityListeners.delete(secondaryPriority)

            if (primaryPriorityListeners.size === 0) {
                escKeyListeners.delete(primaryPriority)
            }

            this.refreshGlobalKeyDownListener()
        }
    }
}

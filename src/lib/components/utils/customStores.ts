import { writable } from 'svelte/store'
import type { BooleanStore, VisibilityStore } from './customStore'

/**
 * Store with a uniq boolean property used to hie / show someting
 * @param initialState  initial state
 * @returns store
 */
export function createVisibilityStore(initialState: boolean = false): VisibilityStore {
    const store = writable(initialState)

    return {
        ...store,
        show: () => store.set(true),
        hide: () => store.set(false),
        toggle: () => store.update((state) => !state),
        setVisible: (state: boolean) => store.set(state)
    }
}

/**
 * Store with a uniq boolean property
 * @param initialState  initial state
 * @returns store
 */
export function createBooleanStore(initialState: boolean = false): BooleanStore {
    const store = writable(initialState)

    return {
        ...store,
        toggle: () => store.update((state) => !state)
    }
}

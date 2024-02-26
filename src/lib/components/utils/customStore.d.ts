import type { Writable } from 'svelte/store'

export interface BooleanStore extends Writable<boolean> {
    toggle: () => void
}

export interface VisibilityStore extends Writable<boolean> {
    toggle: () => void
    show: () => void
    hide: () => void
    toggle: () => void
    setVisible: (state: boolean) => void
}

import type { ActionReturn } from 'svelte/action'
import { Writable } from 'svelte/store'

export type MatchMediaOptions = {
    query?: string | null
    matches: Writable<boolean>
}

interface Attributes {}

export function matchMedia(element: HTMLElement, options: MatchMediaOptions): ActionReturn<MatchMediaOptions, Attributes> {
    const { query, matches } = options

    if (!query || !matches) return {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onChange(e: any) {
        matches.set(e.matches)
    }
    const matcher = window.matchMedia(query)
    matcher.addEventListener('change', onChange)
    matches.set(matcher.matches)

    return {
        destroy() {
            matcher.removeEventListener('change', onChange)
        }
    }
}

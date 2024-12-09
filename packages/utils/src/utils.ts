import { Snippet } from 'svelte'

export function stringValueOrNull(value: string | unknown): string | null {
    return typeof value === 'string' ? value : null
}

export function snippetValueOrNull(value: Snippet | string): Snippet | null {
    return typeof value === 'function' ? value : null
}

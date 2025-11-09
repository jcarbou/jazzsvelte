import type { Snippet } from 'svelte'

export function stringValueOrNull(value: string | unknown): string | null {
    return typeof value === 'string' ? value : null
}

export function snippetValueOrNull<T extends unknown[]>(value: Snippet<T> | string | null | undefined): Snippet<T> | null {
    return value === null || value === undefined || typeof value !== 'function' ? null : value
}

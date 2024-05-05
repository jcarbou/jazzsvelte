/**
 * Execute callback after "duration" milliseconds if "active" is true
 * @param callback  - callback method
 * @param duration  - duration in milliseconds
 * @param active - active
 * @returns clear timeout function
 */
export function timeout(callback: () => void, duration: number, active: boolean = true): () => void {
    if (!active) return () => {}
    const id = setTimeout(callback, duration)
    return () => clearTimeout(id)
}

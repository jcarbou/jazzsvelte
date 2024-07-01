let lastId = 0

export function uniqueId(prefix: string = 'js_id_'): string {
    lastId++

    return `${prefix}${lastId}`
}

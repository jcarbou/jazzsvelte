let lastId = 0

export default function uniqueId(prefix: string = 'js_id_'): string {
    lastId++

    return `${prefix}${lastId}`
}

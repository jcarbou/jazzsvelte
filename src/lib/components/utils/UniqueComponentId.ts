let lastId = 0

export default function UniqueComponentId(prefix: string = 'pr_id_'): string {
    lastId++

    return `${prefix}${lastId}`
}

export type ApiDocParameter = {
    name: string
    type: string
    description?: string
}

export type ApiDocValue = {
    name: string
    value?: string
    optional?: boolean
    readonly?: boolean
    description?: string
    parameters?: ApiDocParameter[]
    returnType?: string
    type?: string
    default?: string
}

export type ApiDocEntity = {
    label: string
    shortLabel: string
    description?: string
    baseDescription?: string
    values: ApiDocValue[]
}

export type ApiDocDataEntities = {
    methods?: ApiDocEntity
    types?: ApiDocEntity
    props?: ApiDocEntity
    ptContext?: ApiDocEntity
    ptOptions?: ApiDocEntity
    ptMethodOptions?: ApiDocEntity
    callbacks?: ApiDocEntity
}

export type ApiDocDataEntityKeys = keyof ApiDocDataEntities

export type ApiDocData = ApiDocDataEntities & {
    id: string
    label: string
    description: string
    meta?: Record<string, string | boolean>
}

export type ApiDocDataKeys = keyof ApiDocData

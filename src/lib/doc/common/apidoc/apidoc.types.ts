export type ApiDoc = { [key: string]: ApiMainComponent }

export type ApiMainComponent = {
    description?: string
    components?: { [key: string]: ApiComponent }
    events?: ApiEvents
    interfaces?: ApiInterfaces
    types?: ApiTypes
    functions?: ApiFunctions
    model?: { [key: string]: ApiModel }
}

export type ApiModel = {
    description?: string
    props: ApiPropsValues
    callbacks: ApiCallbacksValues
}

export type ApiFunctions = {
    description?: string
    values: { [key: string]: ApiFunction }
}

export type ApiTypes = {
    description?: string
    values: {
        [key: string]: {
            values: string
        }
    }
}

export type ApiInterfaces = {
    description?: string
    values: { [key: string]: ApiInterface }
}

export type ApiInterface = {
    description?: string
    relatedProp: string
    extendedTypes?: string
    props: ApiProp[]
    callbacks?: ApiFunction[]
}

export type ApiComponent = {
    description?: string
    methods: ApiComponentMethods
    props: ApiPropsValues
    callbacks: ApiCallbacksValues
}

export type ApiCallbacksValues = {
    description?: string
    values: ApiFunction[]
}

export type ApiFunction = {
    name: string
    parameters: ApiParameter[]
    returnType: string
    description?: string
}

export type ApiParameter = {
    name: string
    optional?: boolean
    type: string
    description?: string
}

export type ApiPropsValues = {
    description?: string
    values: ApiProp[]
}

export type ApiProp = {
    name: string
    optional: boolean
    readonly: boolean
    type: string
    default?: string
    description?: string
}

export type ApiComponentMethods = {
    description?: string
    values: ApiFunction[]
}

export type ApiEvents = {
    description?: string
    values: { [key: string]: ApiEvent }
}

export type ApiEvent = {
    description?: string
    relatedProp: string
    props: ApiProp[]
    extendedBy?: string
    callbacks?: ApiEventCallback[]
    extendedTypes?: string
}

export type ApiEventCallback = {
    name: string
    optional: boolean
    type: string
    description?: string
}

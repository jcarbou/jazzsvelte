export type MainComponent = {
    description: string
    components: { [key: string]: Component }
    events: Events
    interfaces: AccordionInterfaces
    types: AccordionTypes
}

export type Component = {
    description: string
    methods: Methods
    props: Props
    callbacks: Callbacks
}

export type Callbacks = {
    description: string
    values: Callback[]
}

export type Callback = {
    name: string
    parameters: CallbackParametter[]
    returnType: string
    description: string
}

export type CallbackParametter = {
    name: string
    optional: boolean
    type: string
    description: string
}
export type Props = {
    description: string
    values: Prop[]
}

export type Prop = {
    name: string
    optional: boolean
    readonly: boolean
    type: string
    default: string
    description: string
}

export type Methods = {
    description: string
    values: MethodsValue[]
}

export type MethodsValue = {
    name: string
    parameters: MethodsValuueParmeter[]
    returnType: string
    description: string
}

export type MethodsValuueParmeter = {
    name: string
    type: string
    description: string
}

export type Events = {
    description: string
    values: { [key: string]: Event }
}

export type Event = {
    description?: string
    relatedProp: string
    props: EventProp[]
    extendedBy?: string
    callbacks?: EventCallback[]
    extendedTypes?: string
}

export type EventProp = {
    name: string
    optional: boolean
    readonly: boolean
    type: string
    description: string
}

export type EventCallback = {
    name: string
    optional: boolean
    type: string
    description: string
}

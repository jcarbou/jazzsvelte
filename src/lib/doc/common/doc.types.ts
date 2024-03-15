import type { ComponentType } from 'svelte'

export type DocApiData = {
    id: string
    data: DataItem[]
    name: string
    description: string
    allowLink: boolean
}

export type Doc = {
    id: string
    label: string
    children?: Doc[]
    description?: string
    component?: ComponentType
    docApiTable?: ComponentType
    docApiData?: DocApiData
}

export type DocSection = {
    id: string
    label: string
    level?: number
    data?: DataItem[]
}

export type SectionNavContext = {
    activeId: string
}

export type CodeMode = 'basic' | 'data' | 'javascript'

export type CodeLang = 'javascript' | 'typescript'

export type Code = {
    data?: string
    basic?: string
    javascript?: string
    typescript?: string
}

export type ApiTableInfo = DocApiData & {
    isPT: boolean
    headers: string[]
}

export type DataSubItem = {
    name: string
    type: string
}

export type DataItem = {
    value: string
    label: string
    description: string
    deprecated?: string
} & { [key: string]: string | boolean | DataSubItem[] }

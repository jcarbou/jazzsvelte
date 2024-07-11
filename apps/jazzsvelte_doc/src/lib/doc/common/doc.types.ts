import type { ComponentType } from 'svelte'
import type { Writable } from 'svelte/store'

export type DocApiData = {
    id: string
    data: DataItem[]
    name?: string
    label: string
    description?: string
    allowLink: boolean
    isPT: boolean
    headers: string[]
}

export type Doc = {
    id: string
    label: string
    children?: Doc[]
    description?: string
    component?: ComponentType
    docApiData?: DocApiData
}

export type LinkTargets = Record<string, string>

export type LinkEntry = {
    index: number
    linkTarget: string
    apiId: string
    label: string
}

export type ApiDocs = {
    doc: Doc
    linkTargets: LinkTargets
}

export type DocWithChildren = Doc & {
    children: Doc[]
}

export type DocSection = {
    id: string
    label: string
    level?: number
    data?: DataItem[]
}

export type SectionNavContext = {
    activeId: Writable<string>
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
    value?: string
    label?: string
    description?: string
    deprecated?: string
} & { [key: string]: string | boolean | DataSubItem[] }

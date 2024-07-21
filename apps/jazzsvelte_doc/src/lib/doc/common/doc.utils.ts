import { toKebabCase } from '@jazzsvelte/object'
import type { ApiDocs, Doc, DocSection, LinkEntry, LinkTargets } from './doc.types'
import type { ApiDocEntity, ApiDocData, ApiDocDataEntityKeys } from '@jazzsvelte/api'

const API_DATA_SECTIONS: ApiDocDataEntityKeys[] = [
    'props',
    'types',
    'events',
    'methods',
    'callbacks',
    'ptContext',
    'ptOptions',
    'state',
    'ptMethodOptions'
]
const API_DATA_HEADERS: Record<ApiDocDataEntityKeys, string[]> = {
    props: ['name', 'type', 'default', 'description'],
    types: ['name', 'value'],
    methods: ['name', 'parameters', 'returnType', 'description'],
    callbacks: ['name', 'parameters', 'description'],
    ptContext: ['name', 'type', 'description'],
    ptOptions: ['name', 'type', 'description'],
    state: ['name', 'type', 'description'],
    ptMethodOptions: ['name', 'type', 'optional', 'readonly'],
    events: ['name', 'parameters', 'description']
}

export function upperFirst(s: string): string {
    const start = s.substring(0, 1),
        end = s.substring(1)
    return start.toUpperCase() + end
}

export function apiDataToDocs(data: ApiDocData): ApiDocs {
    const docs: Doc[] = [],
        linkTargets: Record<string, string> = {}
    for (const sectionId of API_DATA_SECTIONS) {
        const entity = data[sectionId] as ApiDocEntity | undefined
        if (entity) {
            const { description, label, shortLabel } = entity,
                id = `api_doc_${data.id}_${sectionId}`
            linkTargets[label] = id
            docs.push({
                id,
                label: shortLabel,
                description,
                docApiData: {
                    id,
                    label,
                    description,
                    allowLink: false, // TODO
                    isPT: false, // TODO
                    headers: API_DATA_HEADERS[sectionId],
                    data: entity.values
                }
            })
        }
    }
    const types = data['types']
    if (types) {
        for (const type of types.values) {
            linkTargets[type.name] = `api_doc_${data.id}_types.${type.name}`
        }
    }
    const ptOptions = data['ptOptions']
    if (ptOptions) {
        for (const ptOption of ptOptions.values) {
            if (!ptOption.type?.includes('PassThroughOption')) {
                ptOption.type = `HTML${ptOption.type}Element`
            }
        }
    }
    return {
        doc: {
            id: `api_doc_${data.id}`,
            label: data.label,
            description: data.description,
            children: docs
        },
        linkTargets
    }
}

export function createLinkEntry(id: string, value: string, index: number, linkTargets: LinkTargets): LinkEntry {
    value = value.trim()
    const linkTarget = linkTargets[value]
    return {
        index,
        linkTarget,
        apiId: id + '.' + value,
        label: value
    }
}

export function onLinkClickScrollToAnchor(event: MouseEvent) {
    //event.preventDefault()
    const link = event.currentTarget as HTMLLinkElement
    if (!link.href) return
    const anchorId = new URL(link.href).hash.replace('#', '')
    scrollToAnchor(anchorId, 'smooth')
}

export function scrollToAnchor(anchorId: string, behavior: ScrollBehavior = 'smooth') {
    const anchor = document.getElementById(anchorId) as HTMLElement
    anchor?.parentElement?.scrollIntoView({
        block: 'start',
        behavior
    })
}

export function toDocSection(doc: Doc, level?: number): DocSection {
    return { id: doc.id, label: doc.label, level }
}

export function findActiveDoc(docs: Doc[], y: number): Doc | null {
    if (typeof document === 'undefined') return null
    const topBar = document.getElementsByClassName('layout-topbar')?.[0]
    const headerHeight = topBar?.clientHeight | 0
    for (const doc of docs) {
        const anchor = (document.getElementById(doc.id) as HTMLElement)?.parentElement
        if (!anchor) continue
        const { y: anchorY } = anchor.getBoundingClientRect()
        if (anchorY > y + headerHeight) return doc
        if (doc.children) {
            const subDoc = findActiveDoc(doc.children, y)
            if (subDoc) {
                return subDoc
            }
        }
    }
    return null
}

export const projectName = 'JazzSvelte'

export function importObject(objectId: string, projectId: string) {
    return `import { ${objectId} } from '@jazzsvelte/${projectId}'`
}

export function importType(objectId: string, projectId: string) {
    return `import type { ${objectId} } from '@jazzsvelte/${projectId}'`
}

export function importComponent(cmp: string) {
    return `import { ${cmp} } from '@jazzsvelte/${toKebabCase(cmp, '_')}'`
}

export function importComponents(cmpOrCmpList: string | string[]) {
    if (typeof cmpOrCmpList === 'string') return [importComponent(cmpOrCmpList)]
    const imports = []
    for (const cmp of cmpOrCmpList) imports.push(importComponent(cmp))
    return imports
}

export function importJS(cmpOrCmpList: string | string[], ...codeList: string[]) {
    return scriptJS([...importComponents(cmpOrCmpList), ...codeList].join('\n   '))
}

export function importTS(cmpOrCmpList: string | string[], ...codeList: string[]) {
    return scriptTS([...importComponents(cmpOrCmpList), ...codeList].join('\n   '))
}

export function scriptJS(code: string) {
    return `<script>
   ${code}
</script>`
}

export function scriptTS(code: string) {
    return `<script lang="ts">
   ${code}
</script>`
}

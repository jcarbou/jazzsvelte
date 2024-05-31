import { toKebabCase } from '@jazzsvelte/object'
import type { Doc, DocSection } from './doc.types'

export function onLinkClickScrollToAnchor(event: MouseEvent) {
    //event.preventDefault()
    const link = event.currentTarget as HTMLLinkElement
    if (!link.href) return
    const anchorId = new URL(link.href).hash.replace('#', '')
    const anchor = document.getElementById(anchorId) as HTMLElement
    anchor?.parentElement?.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
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
    return scriptTS([...importComponents(cmpOrCmpList), ...codeList].join('\n'))
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

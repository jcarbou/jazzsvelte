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

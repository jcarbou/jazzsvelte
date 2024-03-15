import type { Doc, DocSection } from './doc.types'

export function onLinkClickScrollToAnchor(event: MouseEvent) {
    event.preventDefault()
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

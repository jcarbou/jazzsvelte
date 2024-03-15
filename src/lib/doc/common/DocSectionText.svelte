<script lang="ts">
    import { page } from '$app/stores'
    import type { DocSection } from './doc.types'

    export let docSection: DocSection

    const { pathname, hash } = $page.url

    const onClick = (event: MouseEvent) => {
        const parentElement = (event.currentTarget as HTMLElement)?.parentElement

        if (!parentElement) return

        hash.slice(1) === docSection.id && event.preventDefault()

        setTimeout(() => {
            parentElement.scrollIntoView({ block: 'start' })
        }, 0)
    }

    $: hx = 'h' + (docSection.level || 2)
</script>

<svelte:element this={hx} class="doc-section-label">
    {docSection.label}
    <a id={docSection.id} on:click={onClick} href={`${pathname}#${docSection.id}`} target="_self">#</a>
</svelte:element>
<div class="doc-section-description">
    <slot />
</div>

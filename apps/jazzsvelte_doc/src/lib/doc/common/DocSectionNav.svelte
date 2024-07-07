<script lang="ts">
    import { setContext } from 'svelte'
    import { page } from '$app/stores'
    import type { Doc, SectionNavContext } from './doc.types'
    import DocSectionNavItem from './DocSectionNavItem.svelte'
    import { writable } from 'svelte/store'
    import { findActiveDoc } from './doc.utils'

    export let docs: Doc[]

    let scrollY: number = 0
    let innerHeight: number = 0
    const activeId = writable<string>('')

    $: {
        const { hash } = $page.url
        const hashId = hash?.substring(1)
        $activeId = hashId ?? docs[0].id
        setContext<SectionNavContext>('docSectionNav', { activeId })
    }

    $: {
        const y = scrollY
        let activeDoc = findActiveDoc(docs, y)
        if (activeDoc) {
            $activeId = activeDoc.id
        }
    }
</script>

<svelte:window bind:scrollY bind:innerHeight />

<ul class="doc-section-nav">
    {#each docs as doc, i (doc.id)}
        <DocSectionNavItem {doc} level={0} />
    {/each}
</ul>

<style lang="scss">
    .doc-section-nav {
        position: sticky;
        top: 6rem;
        right: 0;
        width: 14rem;
        max-height: calc(100vh - 15rem);
        list-style: none;
        margin: 0 0 0 4rem;
        padding: 0.25rem 0;
        overflow-y: auto;
        overflow-x: hidden;
        align-self: flex-start;
    }

    @media screen and (max-width: 1199px) {
        .doc-section-nav {
            display: none;
        }
    }
</style>

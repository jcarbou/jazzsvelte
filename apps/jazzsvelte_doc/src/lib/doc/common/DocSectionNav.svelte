<script lang="ts">
    import { page } from '$app/stores'
    import type { Doc } from './doc.types'
    import DocSectionNavItem from './DocSectionNavItem.svelte'
    import { findActiveDoc } from './doc.utils'
    import { activeNavDoc } from './activeNavDoc.svelte'

    interface Props {
        docs: Doc[]
    }

    const { hash } = $page.url
    const hashId = hash?.substring(1)

    let { docs }: Props = $props()
    let scrollY: number = $state(0)
    let innerHeight: number = $state(0)

    $effect(() => {
        activeNavDoc.id = hashId ?? docs[0].id
    })

    $effect(() => {
        let activeDoc = findActiveDoc(docs, scrollY)
        if (activeDoc) {
            activeNavDoc.id = activeDoc.id
        }
    })
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

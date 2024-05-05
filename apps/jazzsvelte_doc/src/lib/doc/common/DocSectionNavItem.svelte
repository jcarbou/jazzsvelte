<script lang="ts">
    import { getContext } from 'svelte'
    import { page } from '$app/stores'
    import type { Doc, SectionNavContext } from './doc.types'
    import { onLinkClickScrollToAnchor } from './doc.utils'

    export let doc: Doc
    export let level: number = 0

    const { pathname } = $page.url
    const activeId = getContext<SectionNavContext>('docSectionNav')?.activeId
</script>

<li class="navbar-item" class:active-navbar-item={$activeId === doc.id} class:main={level === 0}>
    <div class="navbar-item-content">
        <a href={`${pathname}#${doc.id}`} class="px-link" on:click={onLinkClickScrollToAnchor} title={doc.label}>
            {doc.label}
        </a>
    </div>

    {#if doc.children}
        <ul>
            {#each doc.children as subDoc, i (subDoc.id)}
                <svelte:self doc={subDoc} level={level + 1} />
            {/each}
        </ul>
    {/if}
</li>

<style lang="scss">
    .navbar-item.main {
        .navbar-item-content {
            border-left: 1px solid var(--surface-border);
            //padding-left: 0.25rem;
            transition: all 0.2s;

            &:hover {
                border-left-color: var(--surface-500);
            }
        }
    }

    .navbar-item {
        :global(> .navbar-item-content) {
            display: flex;

            :global(.px-link) {
                padding: 0.25rem 1rem 0.25rem 1rem;
                color: var(--surface-800);
                font-weight: 400;
                white-space: nowrap;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: all 0.2s;
            }

            &:hover {
                :global(.px-link) {
                    color: var(--surface-900);
                }
            }
        }

        &:global(.active-navbar-item) {
            > .navbar-item-content {
                border-color: var(--primary-color);

                .px-link {
                    color: var(--primary-color);
                }
            }
        }

        :global(ul) {
            list-style: none;
            margin: 0;
            padding: 0;

            :global(.navbar-item) {
                :global(.navbar-item-content) {
                    padding-left: 1rem;
                }
            }
        }
    }
</style>

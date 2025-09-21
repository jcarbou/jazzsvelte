<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { DocSection } from './doc.types'

    import { page } from '$app/stores'
    import { onLinkClickScrollToAnchor } from './doc.utils'

    interface Props {
        docSection: DocSection
        children?: Snippet
    }

    let { docSection, children }: Props = $props()

    const { pathname } = $page?.url || ''

    let hx = $derived('h' + (docSection.level || 2))
</script>

<svelte:element this={hx} class="doc-section-label">
    {docSection.label}
    <a id={docSection.id} onclick={onLinkClickScrollToAnchor} href={`${pathname}#${docSection.id}`} target="_self">#</a>
</svelte:element>
<div class="doc-section-description">
    {@render children?.()}
</div>

<style lang="scss">
    .doc-section-label {
        display: flex;
        align-items: center;
        scroll-margin-top: 6.5rem;

        > a {
            color: var(--primary-color);
            opacity: 0.7;
            margin-left: 1rem;
            display: none;
            transition: all 0.2s;
            border-radius: var(--border-radius);

            &:focus-visible {
                outline: 0 none;
                outline-offset: 0;
                box-shadow: var(--focus-ring);
            }
        }

        &:hover {
            > a {
                display: block;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

    .doc-section-description {
        :global(.notification) {
            line-height: 1.5;
            padding: 1rem;
            font-weight: 500;
            border-radius: 10px;
            background-color: var(--doc-highlight-text-bg);
            color: var(--doc-highlight-text-color);
        }

        :global(> p) {
            font-size: 1.125rem;
            color: var(--surface-900);

            :global(i) {
                border-radius: 6px;
                padding: 2px 6px;
                font-size: 1rem;
                font-weight: 500;
                font-style: normal;
                background-color: var(--doc-highlight-text-bg);
                color: var(--doc-highlight-text-color);
            }

            :global(a) {
                color: var(--primary-color);
                font-weight: 500;
                transition: all 0.2s;
                border-radius: var(--border-radius);

                &:focus-visible {
                    outline: 0 none;
                    outline-offset: 0;
                    box-shadow: var(--focus-ring);
                }

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>

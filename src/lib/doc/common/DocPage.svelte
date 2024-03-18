<script lang="ts">
    import DocSectionNav from './DocSectionNav.svelte'
    import DocSections from './DocSections.svelte'
    import type { Doc } from './doc.types'

    export let docs: Doc[]
</script>

<div class="doc">
    <div class="doc-main">
        <div class="doc-intro">
            <slot name="intro" />
        </div>
        <DocSections {docs} />
    </div>
    <DocSectionNav {docs} />
</div>

<style lang="scss">
    .doc {
        display: flex;
    }

    .doc-main {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        min-width: 0;
    }

    .doc-intro {
        margin-bottom: 1.5rem;

        :global(p) {
            font-size: 1.125rem;
            color: var(--surface-900);
            margin: 0;
        }
    }
</style>

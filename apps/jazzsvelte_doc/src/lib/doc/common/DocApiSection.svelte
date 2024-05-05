<script lang="ts">
    import DocSectionNav from './DocSectionNav.svelte'
    import DocSections from './DocSections.svelte'
    import type { Doc } from './doc.types'
    import { projectName } from './doc.utils'

    export let docs: Doc[]
    export let header: any
</script>

<div class="doc-main">
    <div class="doc-intro">
        <h1>{header} API</h1>
        <p>API defines helper props, events and others for the {projectName} {header} module.</p>
    </div>
    <DocSections {docs} />
</div>
<DocSectionNav {docs} />

<style lang="scss">
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

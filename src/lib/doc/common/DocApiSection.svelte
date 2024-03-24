<script lang="ts">
    import DocSectionNav from './DocSectionNav.svelte'
    import DocSections from './DocSections.svelte'
    import { buildApiDocs } from './docApiData'

    export let docNames: string[]
    export let header: any
    export let exclude: { [key: string]: string } | null = null

    $: docs = buildApiDocs(docNames, exclude)
</script>

<div class="doc-main">
    <div class="doc-intro">
        <h1>{header} API</h1>
        <p>API defines helper props, events and others for the PrimeReact {header} module.</p>
    </div>
    <DocSections {docs} />
</div>
<DocSectionNav {docs} />

<style lang="scss">
    .doc-intro {
        margin-bottom: 1.5rem;

        :global(p) {
            font-size: 1.125rem;
            color: var(--surface-900);
            margin: 0;
        }
    }
</style>

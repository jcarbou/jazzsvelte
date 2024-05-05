<script lang="ts">
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>We've created various samples for the popular options in the React ecosystem.</p>
</DocSectionText>
<div class="flex flex-wrap card justify-content-between gap-3">
    <a href="https://github.com/primefaces/primereact-examples/tree/main/cra-basic">
        <img src="https://primefaces.org/cdn/primereact/images/logos/cra.svg" alt="Create React App" class="w-8rem h-8rem" />
    </a>
    <a href="https://github.com/primefaces/primereact-examples/tree/main/nextjs-basic">
        <img src="https://primefaces.org/cdn/primereact/images/logos/next-js.svg" alt="Next.JS" class="w-8rem h-8rem" />
    </a>
    <a href="https://github.com/primefaces/primereact-examples/tree/main/remix-run-basic">
        <img src="https://primefaces.org/cdn/primereact/images/logos/remix.png" alt="Create React App" class="w-8rem h-8rem" />
    </a>
    <a href="https://github.com/primefaces/primereact-examples/tree/main/vite-basic-ts">
        <img src="https://primefaces.org/cdn/primereact/images/logos/vite.png" alt="Vite" class="w-8rem h-8rem" />
    </a>
    <a href="https://github.com/refinedev/refine/tree/master/examples/blog-refine-primereact">
        <img src="https://primefaces.org/cdn/primereact/images/logos/refine.svg" alt="Refine" class="w-8rem h-8rem" />
    </a>
</div>

<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Panel } from '@jazzsvelte/panel'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS } from '$lib/doc/common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
    ${importJS('Panel')}   

<Panel header="CSS Module" class={class}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</Panel>

<style>
    .p-panel > :global(.p-panel-header) {
        background-color: #54b5a6;
        color: #ffffff;
    }
</style>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        CSS-in-JS solutions are also popular to implement scoped css, as an example we'll be using <a
            href="https://github.com/vercel/styled-jsx">styled-jsx</a
        >
        to customize our panel. Note that use of <i>:global</i> does not make the styling global and only removes the namespacing
        from the inner element as it is enough to scope the main container element, in this case <i>.p-panel</i>.
    </p>
</DocSectionText>
<div class="card">
    <Panel header="Style">
        <p class="p-0 m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</div>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

<style>
    .p-panel > :global(.p-panel-header) {
        background-color: #54b5a6;
        color: #ffffff;
    }
</style>

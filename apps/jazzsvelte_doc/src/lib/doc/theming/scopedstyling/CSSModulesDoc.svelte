<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Panel } from '@jazzsvelte/panel'
    import panelDemoModule from './paneldemo.module.css'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code1 = {
        basic: `
/* paneldemo.module.css */
.mypanel > [class~="p-panel-header"] {
    background-color: #07c4e8;
    color: #ffffff;

        `
    }

    const code2 = {
        basic: `
import { Panel } from 'primereact/panel';
import panelDemoModule from './paneldemo.module.css';

        <Panel header="CSS Module" class={stylesModule.mypanel}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Panel>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        CSS modules allow importing a css file to your react component and refer the classes inside using a variable.
        Unfortunately CSS modules do not support cascaded classes to be applied to external components however attribute selectors
        can be used as a common workaround until PrimeReact exposes component internals via new properties. NextJS has built-in
        support for CSS modules allowing css files with <i>.module.css</i> suffix to be interpreted as modules.
    </p>
</DocSectionText>
<div class="card">
    <Panel header="CSS Module" class={panelDemoModule.mypanel}>
        <p class="p-0 m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</div>
<DocSectionCode code={code1} hideToggleCode toImport hideStackBlitz />
<DocSectionCode code={code2} hideToggleCode toImport hideStackBlitz />

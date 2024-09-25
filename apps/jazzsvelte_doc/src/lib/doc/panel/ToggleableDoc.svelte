<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { Panel } from '@jazzsvelte/panel'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    let panelCmp: Panel

    const code = {
        basic: `
<Panel header="Header" toggleable>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Panel>
        `,
        javascript: `
${importJS(['Panel', 'Button'], '   let panelCmp')}

<Button label="Toggle" class="m-2" on:click={() => panelCmp.toggle()} />
<Button label="Expand" class="m-2" on:click={() => panelCmp.expand()} />
<Button label="Collapse" class="m-2" on:click={() => panelCmp.collapse()} />
<Panel ref={ref} header="Header" toggleable>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Panel>
        `,
        typescript: `
${importTS(['Panel', 'Button'], '   let panelCmp : Panel')}

<Button label="Toggle" class="m-2" on:click={() => panelCmp?.toggle()} />
<Button label="Expand" class="m-2" on:click={() => panelCmp?.expand()} />
<Button label="Collapse" class="m-2" on:click={() => panelCmp?.collapse()} />
<Panel ref={ref} header="Header" toggleable>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Panel>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Content of the panel can be expanded and collapsed when <i>toggleable</i> option is enabled. A toggleable panel can either
        be used as a Controlled or Uncontrolled component. In controlled mode a binding to <i>collapsed</i>{' '}
        property along with <i>onToggle</i> event are needed to manage the content state.
    </p>
</DocSectionText>
<div class="card">
    <Button label="Toggle" class="m-2" on:click={() => panelCmp.toggle()} />
    <Button label="Expand" class="m-2" on:click={() => panelCmp.expand()} />
    <Button label="Collapse" class="m-2" on:click={() => panelCmp.collapse()} />

    <Panel bind:this={panelCmp} header="Header" toggleable>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</div>
<DocSectionCode {code} />

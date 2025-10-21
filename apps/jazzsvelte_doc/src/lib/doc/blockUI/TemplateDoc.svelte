<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { BlockUI } from '@jazzsvelte/block_ui'
    import { Panel } from '@jazzsvelte/panel'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let blocked = $state(false)
    const buttonText = $derived(blocked ? 'Subscribe' : 'Unsubscribe')

    const codeBasic = `
<BlockUI {blocked}>
    {#snippet snippet()}
        <i class="pi pi-lock" style="font-size:3rem;"></i>
    {/snippet}
    <Panel header="Prime React News">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</BlockUI>
<div class="mt-3 flex flex-column align-items-center">
    <h3>Continue reading?</h3>
    <Button label={buttonText} onclick={() => (blocked = !blocked)} />
</div>
`
    const codeFull = `${importJS(
        ['BlockUI', 'Panel', 'Button'],
        `
    let blocked = $state(false)
    const buttonText = $derived(blocked ? 'Subscribe' : 'Unsubscribe')`
    )}
${codeBasic}
`
    const code = {
        basic: codeBasic,
        javascript: codeFull,
        typescript: codeFull
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content can be placed inside the modal layer using the <i>template</i> property.
    </p>
</DocSectionText>
<div class="card">
    <BlockUI {blocked}>
        {#snippet snippet()}
            <i class="pi pi-lock" style="font-size:3rem;"></i>
        {/snippet}
        <Panel header="Prime React News">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>
    </BlockUI>
    <div class="mt-3 flex flex-column align-items-center">
        <h3>Continue reading?</h3>
        <Button label={buttonText} onclick={() => (blocked = !blocked)} />
    </div>
</div>
<DocSectionCode {code} />

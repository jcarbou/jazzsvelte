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

    const codeBasic = `
<div class="mb-3">
    <Button label="Block" onclick={() => (blocked = true)} class="mr-2" />
    <Button label="Unblock" onclick={() => (blocked = false)} severity="secondary" />
</div>
<BlockUI {blocked}>
    <Panel header="Basic">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</BlockUI>
`
    const codeFull = `${importJS(
        ['BlockUI', 'Panel', 'Button'],
        `
   let blocked = $state(false)`
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
        The element to block should be placed as a child of BlockUI and <i>blocked</i> property is required to control the state.
    </p>
</DocSectionText>
<div class="card">
    <div class="mb-3">
        <Button label="Block" onclick={() => (blocked = true)} class="mr-2" />
        <Button label="Unblock" onclick={() => (blocked = false)} severity="secondary" />
    </div>
    <BlockUI {blocked}>
        <Panel header="Basic">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>
    </BlockUI>
</div>
<DocSectionCode {code} />

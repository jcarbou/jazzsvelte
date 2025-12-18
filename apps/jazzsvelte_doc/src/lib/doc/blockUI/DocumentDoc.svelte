<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { BlockUI } from '@jazzsvelte/block_ui'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let blocked = $state(false)

    $effect(() => {
        if (blocked) {
            setTimeout(() => {
                blocked = false
            }, 3000)
        }
    })

    const codeBasic = `
<BlockUI {blocked} fullScreen />
<Button label="Block" onclick={() => (blocked = true)} />
`
    const codeFull = `${importJS(
        ['BlockUI', 'Button'],
        `
   let blocked = $state(false)

    $effect(() => {
        if (blocked) {
            setTimeout(() => {
                blocked = false
            }, 3000)
        }
    })`
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
        Enabling <i>fullScreen</i> property controls the document.
    </p>
</DocSectionText>
<div class="card">
    <BlockUI {blocked} fullScreen />
    <Button label="Block" onclick={() => (blocked = true)} />
</div>
<DocSectionCode {code} />

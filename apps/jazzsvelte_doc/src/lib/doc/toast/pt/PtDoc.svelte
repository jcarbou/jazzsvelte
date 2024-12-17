<script lang="ts">
    import { importJS, importObject, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    function showMessage() {
        showToast({
            severity: 'info',
            summary: 'Info',
            detail: 'Message Content',
            pt: {
                root: { class: `bg-yellow-100` }
            }
        })
    }

    const codeFn = `
function showMessage() {
        showToast({
            severity: 'info',
            summary: 'Info',
            detail: 'Message Content',
            pt: {
                root: { class: 'bg-yellow-100' }
            }
        })
    }
`
    const codeButton = `
<Button onclick={showMessage} label="Show" />
`

    const codeBasic = `
${importJS(['Button'], importObject('showToast', 'toast'), codeFn)}
${codeButton}
`
    const code = {
        basic: codeBasic
    }
</script>

<DocSectionText {docSection} />
<div class="card flex justify-content-center">
    <Button onclick={showMessage} label="Show" />
</div>
<DocSectionCode {code} />

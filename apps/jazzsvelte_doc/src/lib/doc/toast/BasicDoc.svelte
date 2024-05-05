<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'

    export let docSection: DocSection

    const showInfo = () => {
        showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
    }

    const code = {
        basic: `
<Button on:click={showInfo} label="Basic" />
        `,
        javascript: `
${importJS(
    ['Toast', 'Button'],
    `
import {showToast}  from 'toast/toast.store'

const showInfo  = () => {
    showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
}
`
)}


<div class="card flex justify-content-center">
    <Toast ref={toast} />
    <Button on:click={showInfo} label="Show" />
</div>

<!-- <Toast/> must be inserted in your main page -->
        `,
        typescript: `
${importTS(
    ['Toast', 'Button'],
    `
import {showToast}  from 'toast/toast.store'

const showInfo  = () => {
    showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
}
`
)}

<div class="card flex justify-content-center">
    <Button on:click={showInfo} label="Show" />
</div>

<!-- <Toast/> must be inserted in your main page -->
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Messages are displayed by calling the <i>show</i> method provided by the component ref. A single message is specified by
        the Message interface that defines various properties such as <i>severity</i>, <i>summary</i> and{' '}
        <i>detail</i>.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button on:click={showInfo} label="Show" />
</div>
<DocSectionCode {code} />

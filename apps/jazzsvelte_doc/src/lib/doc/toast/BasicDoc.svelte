<script lang="ts">
    import { importObject, importComponent, importJS, importTS } from '../common/doc.utils'
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
// Main page
<Toast />

// Eveywhere
showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
   `,
        javascript: `
// Main page
${importJS('Toast')}

...
<Toast />

// Everywhere
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    `
   const showInfo  = () => {
      showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
   }
`
)}

<Button on:click={showInfo} label="Show" />
        `,
        typescript: `
// Main page
${importJS('Toast')}

...
<Toast />

// Everywhere
${importJS(
    ['Button'],
    importObject('showToast', 'toast'),
    `
   const showInfo  = () => {
      showToast({ severity: 'info', summary: 'Info', detail: 'Message Content' })
   }
`
)}

<Button on:click={showInfo} label="Show" />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Messages are displayed by calling the <i>showToast</i> method. A single message is specified by the Message interface that
        defines various properties such as <i>severity</i>, <i>summary</i> and{' '}
        <i>detail</i>. The <i>ToastMessage</i> is generated and displayed inside the <i>Toast</i> component. So the
        <i>Toast</i> component must be insetred in the main page of your application.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button on:click={showInfo} label="Show" />
</div>
<DocSectionCode {code} />

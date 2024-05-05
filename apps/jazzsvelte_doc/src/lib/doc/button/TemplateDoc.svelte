<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
</Button>
        `,
        javascript: `
${importJS('Button')}

<div class="card flex justify-content-center">
    <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
    </Button>
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex justify-content-center">
    <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem"/>
    </Button>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Custom content inside a button is defined as children.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" class="h-2rem" />
    </Button>
</div>
<DocSectionCode {code} />

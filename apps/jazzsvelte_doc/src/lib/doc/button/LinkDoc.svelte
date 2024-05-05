<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button label="Link" link />
<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="p-button font-bold">
    Navigate
</a>
        `,
        javascript: `
 ${importJS('Button')}

<div class="card flex justify-content-center">
    <Button label="Link" link />
    <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="p-button font-bold">
        Navigate
    </a>
</div>
        `,
        typescript: `
 ${importTS('Button')}

<div class="card flex justify-content-center">
    <Button label="Link" link />
    <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="p-button font-bold">
        Navigate
    </a>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A button can be rendered as a link when the <i>link</i> property is present. On the other hand, adding <i>.p-button</i> class
        to an anchor element displays the link as a button.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button label="Link" link />
    <a href="https://react.dev" target="_blank" rel="noopener noreferrer" class="p-button font-bold"> Navigate </a>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
    let value: string = ''

    const code = {
        basic: `
<InputText bind:value={value} />
        `,
        javascript: `
${importJS('InputText', "let value = ''")}

<div class="card flex justify-content-center">
    <InputText bind:value={value} />
</div>
        `,
        typescript: `
${importTS('InputText', "let value : string = ''")}

<div class="card flex justify-content-center">
    <InputText bind:value={value} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        InputText is used as a controlled input with <i>value</i> and <i>onChange</i> properties.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText bind:value keyFilter="int" />
</div>
<DocSectionCode {code} />

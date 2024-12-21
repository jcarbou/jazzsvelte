<script lang="ts">
    import { simpleCode } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['InputText'],
        `
<InputText type="text" class="p-inputtext-sm" placeholder="Small" />
<InputText type="text" placeholder="Normal" />
<InputText type="text" class="p-inputtext-lg" placeholder="Large" />
        `
    )
</script>

<DocSectionText {docSection}>
    <p>
        Apply <i>.p-inputtext-sm</i> to reduce the size of the input element or <i>.p-inputtext-lg</i> to enlarge it.
    </p>
</DocSectionText>
<div class="card flex flex-column align-items-center gap-3">
    <InputText type="text" class="p-inputtext-sm" placeholder="Small" />
    <InputText type="text" placeholder="Normal" />
    <InputText type="text" class="p-inputtext-lg" placeholder="Large" />
</div>
<DocSectionCode {code} />

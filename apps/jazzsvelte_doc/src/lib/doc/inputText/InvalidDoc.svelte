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
<InputText class="p-invalid" />
        `
    )
</script>

<DocSectionText {docSection}>
    <p>
        Invalid state style is added using the <i>p-invalid</i> class to indicate a failed validation.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText class="p-invalid" />
</div>
<DocSectionCode {code} />

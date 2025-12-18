<script lang="ts">
    import { simpleCode } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['InputText'],
        `
<InputText type="text" fieldSize="samll" placeholder="Small" />
<InputText type="text" placeholder="Normal" />
<InputText type="text" fieldSize="normal" placeholder="Normal" />
<InputText type="text" fieldSize="large" placeholder="Large" />
        `
    )
</script>

<DocSectionText {docSection}>
    <p>
        Apply <i>small</i> to reduce the size of the input element or <i>large</i> to enlarge it.
    </p>
</DocSectionText>
<div class="card flex flex-column align-items-center items-center gap-3">
    <InputText type="text" fieldSize="small" placeholder="Small" />
    <InputText type="text" placeholder="Normal" />
    <InputText type="text" fieldSize="normal" placeholder="Normal" />
    <InputText type="text" fieldSize="large" placeholder="Large" />
</div>
<DocSectionCode {code} />

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
<InputText variant="filled" />
        `
    )
</script>

<DocSectionText {docSection}>
    <p>
        Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the
        default <i>outlined</i> style.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText variant="filled" />
</div>
<DocSectionCode {code} />

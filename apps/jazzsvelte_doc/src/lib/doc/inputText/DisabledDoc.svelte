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
<InputText disabled placeholder="Disabled" />
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        When <i>disabled</i> is present, the element cannot be edited and focused.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText disabled placeholder="Disabled" />
</div>
<DocSectionCode {code} />

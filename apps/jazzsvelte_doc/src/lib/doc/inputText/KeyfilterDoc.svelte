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
<InputText keyFilter="int" placeholder="Integers" />
        `
    )
</script>

<DocSectionText {docSection}>
    <p>
        InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more
        information.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <InputText keyFilter="int" placeholder="Integers" />
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS, simpleCode } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['InputText'],
        `
<div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
</div>
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        An advisory text can be defined with the semantic <i>small</i> tag.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
    </div>
</div>
<DocSectionCode {code} />

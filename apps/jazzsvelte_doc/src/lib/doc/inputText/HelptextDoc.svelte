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

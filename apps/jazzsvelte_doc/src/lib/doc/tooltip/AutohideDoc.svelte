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
<InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
<InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set <i
            >autoHide</i
        > to false to change the default behavior.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-2">
    <InputText type="text" placeholder="autoHide: false" tooltip="Enter your username" tooltipOptions={{ autoHide: false }} />
    <InputText type="text" placeholder="autoHide: true" tooltip="Enter your username" />
</div>
<DocSectionCode {code} />

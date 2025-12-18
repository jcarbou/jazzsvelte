<script lang="ts">
    import { simpleCode } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['InputText'],
        `
<Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }} label="Save" />
</div>
<DocSectionCode {code} />

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
<Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        When <i>mouseTrack</i> option is enabled, position of the Tooltip is updated according to the pointer coordinates.
    </p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button
        type="button"
        label="Save"
        icon="pi pi-check"
        tooltip="Save"
        tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
    />
</div>
<DocSectionCode {code} />

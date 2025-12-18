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
<Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />`
    )
</script>

<DocSectionText {docSection}>
    <p>
        Disabled elements do not trigger user interactions due to standard behavior. A common workaround for such cases is
        wrapping the disabled element with another element that has a tooltip attached. If the tooltip is built-in to the
        component then enable <i>showOnDisabled</i> option instead.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Button type="button" label="Save" icon="pi pi-check" disabled tooltip="Disabled" tooltipOptions={{ showOnDisabled: true }} />
</div>
<DocSectionCode {code} />

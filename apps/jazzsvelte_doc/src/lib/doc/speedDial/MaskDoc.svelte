<script lang="ts">
    import type { ComponentDocProps } from '../common/doc.types'

    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial mask model={items} radius={120} direction="up" style="right:0;bottom:0;" />
`

    const code = {
        basic: codeBasic,
        javascript: `
        ${importJS('SpeedDial', `import { showToast } from '@jazzsvelte/toast'`, CODE_SPEED_DIAL_ITEMS)}
        ${codeBasic}
`,
        typescript: `
        ${importTS('SpeedDial', `import { showToast } from '@jazzsvelte/toast'`, CODE_SPEED_DIAL_ITEMS)}
        ${codeBasic}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Adding <i>mask</i> property displays a modal layer behind the popup items.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:350px;">
        <SpeedDial mask model={SPEED_DIAL_ITEMS} radius={120} direction="up" style="right:0;bottom:0;" />
    </div>
</div>
<DocSectionCode {code} />

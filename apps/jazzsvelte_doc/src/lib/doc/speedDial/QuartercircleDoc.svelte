<script lang="ts">
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
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
        Setting <i>type</i> as <i>quarter-circle</i> displays the items at one of four corners of a button based on the
        <i>direction</i>.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:500px;">
        <SpeedDial model={SPEED_DIAL_ITEMS} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
    </div>
</div>
<DocSectionCode {code} />

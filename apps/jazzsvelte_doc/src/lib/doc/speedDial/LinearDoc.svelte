<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import type { ComponentDocProps } from '../common/doc.types'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial model={items} direction="up" style="left:calc(50% - 2rem);bottom:0;" />
<SpeedDial model={items} direction="down" style="left:calc(50% - 2rem);top:0;" />
<SpeedDial model={items} direction="left" style="top:calc(50% - 2rem);right:0;" />
<SpeedDial model={items} direction="right" style="top:calc(50% - 2rem);left:0;" />
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
        SpeedDial items are defined with the <i>model</i> property based on MenuModel API. Default orientation of the items is
        linear and <i>direction</i> property is used to define the position of the items related to the button.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:500px;">
        <SpeedDial model={SPEED_DIAL_ITEMS} direction="up" style="left:calc(50% - 2rem);bottom:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} direction="down" style="left:calc(50% - 2rem);top:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} direction="left" style="top:calc(50% - 2rem);right:0;" />
        <SpeedDial model={SPEED_DIAL_ITEMS} direction="right" style="top:calc(50% - 2rem);left:0;" />
    </div>
</div>
<DocSectionCode {code} />

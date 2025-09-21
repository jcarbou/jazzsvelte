<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial model={items} radius={80} type="circle" buttonClass="p-button-warning" />    
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
        Items can be displayed around the button when <i>type</i> is set to <i>circle</i>. Additional <i>radius</i> property defines
        the radius of the circle.
    </p>
</DocSectionText>
<div class="card">
    <div style="height:500px;" class="flex align-items-center justify-content-center">
        <SpeedDial model={SPEED_DIAL_ITEMS} radius={80} type="circle" buttonClass="p-button-warning" />
    </div>
</div>
<DocSectionCode {code} />

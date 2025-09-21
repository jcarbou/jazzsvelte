<script lang="ts">
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial
    model={items}
    direction="up"
    transitionDelay={80}
    showIcon="pi pi-bars"
    hideIcon="pi pi-times"
    rotateAnimation={false}
    buttonClass="p-button-outlined"
/>
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
        SpeedDial sample with an outlined button, custom icons and <i>transitionDelay</i>.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex align-items-end justify-content-center" style="height:350px;">
        <SpeedDial
            model={SPEED_DIAL_ITEMS}
            direction="up"
            transitionDelay={80}
            showIcon="pi pi-bars"
            hideIcon="pi pi-times"
            rotateAnimation={false}
            buttonClass="p-button-outlined"
        />
    </div>
</div>
<DocSectionCode {code} />

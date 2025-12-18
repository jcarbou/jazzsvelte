<script lang="ts">
    import type { ComponentDocProps } from '../common/doc.types'

    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { CODE_SPEED_DIAL_ITEMS, SPEED_DIAL_ITEMS } from './speedDial.data'

    let { docSection }: ComponentDocProps = $props()

    const codeBasic = `
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-right right-0 bottom-0"
    buttonClass="p-button-danger"
    getTooltip="label"
    tooltipOptions={{
        position: 'left'
    }}
/>
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-left left-0 bottom-0"
    buttonClass="p-button-help"
    getTooltip={({ label, description }) => description || label}
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
        Items display a tooltip on hober when a standalone <a href="/tooltip">Tooltip</a> is present with a target that matches the
        items.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:350px;">
        <SpeedDial
            model={SPEED_DIAL_ITEMS}
            direction="up"
            class="speeddial-bottom-right right-0 bottom-0"
            buttonClass="p-button-danger"
            getTooltip="label"
            tooltipOptions={{
                position: 'left'
            }}
        />
        <SpeedDial
            model={SPEED_DIAL_ITEMS}
            direction="up"
            class="speeddial-bottom-left left-0 bottom-0"
            buttonClass="p-button-help"
            getTooltip={({ label, description }) => description || label}
        />
    </div>
</div>
<DocSectionCode {code} />

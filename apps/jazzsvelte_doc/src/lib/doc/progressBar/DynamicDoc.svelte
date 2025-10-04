<script lang="ts">
    import { importJS, importObject, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ProgressBar } from '@jazzsvelte/progress_bar'
    import { Toast, showToast } from '@jazzsvelte/toast'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let value = $state(0)

    let _val = 0
    let current: ReturnType<typeof setInterval> | null = setInterval(() => {
        _val = _val + (Math.floor(Math.random() * 10) + 1)

        if (_val >= 100) {
            _val = 100
            showToast({ severity: 'info', summary: 'Success', detail: 'Process Completed' })
            current && clearInterval(current)
            current = null
        }

        value = _val
    }, 2000)

    const code = {
        basic: `
<ProgressBar value={value}></ProgressBar>
        `,
        javascript: `
${importJS(
    'ProgressBar',
    importObject('showToast', 'toast'),
    `
    let _val = 0
    let current = setInterval(() => {
        _val = _val + (Math.floor(Math.random() * 10) + 1)

        if (_val >= 100) {
            _val = 100
            showToast({ severity: 'info', summary: 'Success', detail: 'Process Completed' })
            current && clearInterval(current)
            current = null
        }

        value = _val
    }, 2000)`
)}
    
<div class="card">
    <ProgressBar value={value}></ProgressBar>
</div>
`,
        typescript: `
${importTS(
    'ProgressBar',
    importObject('showToast', 'toast'),
    `
    let _val = 0
    let current: ReturnType<typeof setInterval> | null = setInterval(() => {
        _val = _val + (Math.floor(Math.random() * 10) + 1)

        if (_val >= 100) {
            _val = 100
            showToast({ severity: 'info', summary: 'Success', detail: 'Process Completed' })
            current && clearInterval(current)
            current = null
        }

        value = _val
    }, 2000)`
)}

<div class="card">
    <ProgressBar value={value}></ProgressBar>
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>Value is reactive so updating it dynamically changes the bar as well.</p>
</DocSectionText>
<div class="card">
    <ProgressBar {value} />
</div>
<DocSectionCode {code} />

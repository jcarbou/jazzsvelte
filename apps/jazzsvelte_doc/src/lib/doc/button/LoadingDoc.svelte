<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    let loading = $state(false)

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 3000)
    }

    const code = {
        basic: `
<Button label="Submit" icon={CheckIcon} loading={loading} onClick={load} />
        `,
        javascript: `
${importJS(
    ['Button', 'CheckIcon'],
    `
    const loading = false

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }`
)}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" icon={CheckIcon} loading={loading} onClick={load} />
</div>
        `,
        typescript: `
${importTS(
    ['Button', 'CheckIcon'],
    `
    const loading: boolean = false

    const load = () => {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }`
)}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" icon={CheckIcon} loading={loading} onClick={load} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Busy state is controlled with the <i>loading</i> property.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button label="Submit" iconPos="right" icon={CheckIcon} {loading} onclick={load} />
</div>
<DocSectionCode {code} />

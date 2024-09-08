<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SplitButton } from '@jazzsvelte/split_button'
    import { items, save, importCode, dataJsCode, dataTsCode } from './data'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '@jazzsvelte/toast'

    export let docSection: DocSection

    let loading: boolean = false

    const saveLoading = () => {
        loading = true

        setTimeout(() => {
            loading = false

            showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
        }, 2000)
    }

    const code = {
        basic: `
<SplitButton label="Save" icon="pi pi-plus" on:click={save} model={items} loading={loading} />
        `,
        javascript: `
${importJS(
    'SplitButton',
    importCode,
    dataJsCode,
    `
   let loading = false

const saveLoading = () => {
    loading = true

    setTimeout(() => {
        loading = false

        showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
    }, 2000)
}`
)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={saveLoading} model={items} loading={loading} />
</div>
  `,
        typescript: `
${importTS(
    'SplitButton',
    importCode,
    dataTsCode,
    `
   let loading : boolean = false

    const saveLoading = () => {
        loading = true

        setTimeout(() => {
            loading = false

            showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
        }, 2000)
    }`
)}

<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={saveLoading} model={items} loading={loading} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        SplitButton has a default action button and a collection of additional options defined by the <i>model</i> property based on
        MenuModel API.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <SplitButton label="Save" icon="pi pi-plus" on:click={saveLoading} model={items} {loading} />
</div>
<DocSectionCode {code} />

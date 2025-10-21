<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TabMenu } from '@jazzsvelte/tab_menu'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ]

    const codeItems = `
    const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ]
`
    const code = {
        basic: `
${importJS('TabMenu')}
`,
        javascript: `
${importJS('TabMenu', codeItems)}

<div class="card">
    <TabMenu model={items} />
</div>
`,
        typescript: `
${importTS('TabMenu', codeItems)}

<div class="card">
    <TabMenu model={items} />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Steps requires a collection of menuitems as its <i>model</i>.
    </p>
</DocSectionText>
<div class="card">
    <TabMenu model={items} />
</div>
<DocSectionCode {code} />

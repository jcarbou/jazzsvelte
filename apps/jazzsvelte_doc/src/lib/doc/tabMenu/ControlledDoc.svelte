<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { TabMenu } from '@jazzsvelte/tab_menu'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ]

    let activeIndex = $state(0)
    const codeItems = `
    const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ]

    let activeIndex = $state(0)
    `
    const codeDom = `
<div class="card">
    <div class="flex flex-wrap justify-content-end gap-2 mb-3">
        <Button outlined={activeIndex !== 0} rounded label="1" onclick={() => (activeIndex = 0)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 1} rounded label="2" onclick={() => (activeIndex = 1)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 2} rounded label="3" onclick={() => (activeIndex = 2)} class="w-2rem h-2rem p-0" />
    </div>
    <TabMenu model={items} bind:activeIndex />
</div>`
    const code = {
        basic: `
<Button outlined={activeIndex !== 0} rounded label="1" onclick={() => (activeIndex = 0)} class="w-2rem h-2rem p-0" />
<TabMenu model={items} bind:activeIndex />
        `,
        javascript: `
${importJS(['TabMenu', 'Button'], codeItems)}

${codeDom}
`,
        typescript: `
${importJS(['TabMenu', 'Button'], codeItems)}

${codeDom}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        In controlled mode, a binding to <i>activeIndex</i> property along with <i>onTabChange</i> event are needed to manage the active
        item.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap justify-content-end gap-2 mb-3">
        <Button outlined={activeIndex !== 0} rounded label="1" onclick={() => (activeIndex = 0)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 1} rounded label="2" onclick={() => (activeIndex = 1)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 2} rounded label="3" onclick={() => (activeIndex = 2)} class="w-2rem h-2rem p-0" />
    </div>
    <TabMenu model={items} bind:activeIndex />
</div>
<DocSectionCode {code} />

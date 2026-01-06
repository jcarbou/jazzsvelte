<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Steps } from '@jazzsvelte/steps'
    import { Button } from '@jazzsvelte/button'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let activeIndex = $state(0)
    const items = [{ label: 'Personal Info' }, { label: 'Reservation' }, { label: 'Review' }]

    const codeItems = `
    let activeIndex = $state(0)
    const items = [{ label: 'Personal Info' }, { label: 'Reservation' }, { label: 'Review' }]
`

    const code = {
        basic: `
<Steps model={items} />
`,
        javascript: `
${importJS(['Steps', 'Button'], codeItems)}
<div class="card">
    <div class="flex flex-wrap justify-content-end gap-2 mb-3">
        <Button outlined={activeIndex !== 0} rounded label="1" onclick={() => activeIndex=0} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 1} rounded label="2" onclick={() => activeIndex=1} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 2} rounded label="3" onclick={() => activeIndex=2} class="w-2rem h-2rem p-0" />
    </div>
    <Steps model={items} activeIndex={activeIndex} />
</div>
 `,
        typescript: `
${importTS(['Steps', 'Button'], codeItems)}
<div class="card">
    <div class="flex flex-wrap justify-content-end gap-2 mb-3">
        <Button outlined={activeIndex !== 0} rounded label="1" onclick={() => activeIndex=0} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 1} rounded label="2" onclick={() => activeIndex=1} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 2} rounded label="3" onclick={() => activeIndex=2} class="w-2rem h-2rem p-0" />
    </div>
    <Steps model={items} activeIndex={activeIndex} />
</div>`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Steps can be controlled programmatically using <i>activeIndex</i> property.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap justify-content-end gap-2 mb-3">
        <Button outlined={activeIndex !== 0} rounded label="1" onclick={() => (activeIndex = 0)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 1} rounded label="2" onclick={() => (activeIndex = 1)} class="w-2rem h-2rem p-0" />
        <Button outlined={activeIndex !== 2} rounded label="3" onclick={() => (activeIndex = 2)} class="w-2rem h-2rem p-0" />
    </div>
    <Steps model={items} {activeIndex} />
</div>
<DocSectionCode {code} />

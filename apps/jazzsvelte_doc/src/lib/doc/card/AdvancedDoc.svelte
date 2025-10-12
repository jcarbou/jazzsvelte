<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { Card } from '@jazzsvelte/card'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeAll = `
<div class="card flex justify-content-center">
    <Card title="Advanced Card" subTitle="Card subtitle" class="md:w-25rem">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
            deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
        {#snippet headerSnippet()}
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
        {/snippet}
        {#snippet footerSnippet()}
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style="margin-left:0.5em;" />
        {/snippet}            
    </Card>
</div>`
    const code = {
        basic: codeAll,
        javascript: `
${importJS(['Card', 'Button'])}
${codeAll}
`,
        typescript: `
${importTS(['Card', 'Button'])}
${codeAll}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Card content can be customized further with <i>subTitle</i>, <i>header</i> and <i>footer</i> properties.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Card title="Advanced Card" subTitle="Card subtitle" class="md:w-25rem">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
            deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
        {#snippet headerSnippet()}
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
        {/snippet}
        {#snippet footerSnippet()}
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style="margin-left:0.5em;" />
        {/snippet}
    </Card>
</div>
<DocSectionCode {code} />

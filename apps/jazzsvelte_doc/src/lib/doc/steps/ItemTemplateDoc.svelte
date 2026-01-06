<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Steps, type StepMenuItem, type StepMenuItemSnippetProps } from '@jazzsvelte/steps'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
    const items: StepMenuItem[] = [
        {
            icon: 'pi pi-user',
            snippet: circleSnippet
        },
        {
            icon: 'pi pi-calendar',
            snippet: squareSnippet
        },
        {
            icon: 'pi pi-check',
            snippet: circleSnippet
        }
    ]

    const codeItems = `
    const items: StepMenuIem[] = [
        {
            icon: 'pi pi-user',
            snippet: circleSnippet
        },
        {
            icon: 'pi pi-calendar',
            snippet: squareSnippet
        },
        {
            icon: 'pi pi-check',
            snippet: circleSnippet
        }
    ]
`

    const codeSnippet = `
{#snippet circleSnippet({ item, index, stepOptions: { active, onClick } }: StepMenuIemSnippetProps)}
    <button
        class="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={[
            \`background-color:\${active ? 'var(--primary-color)' : 'var(--surface-b)'}\`,
            \`color:\${active ? 'var(--surface-b)' : 'var(--text-color-secondary)'}\`,
            \`margin-top: -25px\`
        ].join(';')}
        onclick={onClick}
        aria-label={'label_' + index}
    >
        <i class={\`\${item.icon} text-xl\`}></i>
    </button>
{/snippet}

{#snippet squareSnippet({ item, index, stepOptions: { active, onClick } }: StepMenuIemSnippetProps)}
    <button
        class="inline-flex align-items-center justify-content-center align-items-center border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={[
            \`background-color:\${active ? 'var(--primary-color)' : 'var(--surface-b)'}\`,
            \`color:\${active ? 'var(--surface-b)' : 'var(--text-color-secondary)'}\`,
            \`margin-top: -25px\`
        ].join(';')}
        onclick={onClick}
        aria-label={'label_' + index}
    >
        <i class={\`\${item.icon} text-xl\`}></i>
    </button>
{/snippet}
`
    const code = {
        basic: `
<Steps model={items} readOnly={false} class="m-2 pt-4" />
`,
        javascript: `
${importJS('Steps', codeItems.replace(': StepMenuIem[]', ''))}

<div class="card">
    <Steps model={items} readOnly={false} class="m-2 pt-4" />
</div>

${codeSnippet.replace(': StepMenuIemSnippetProps', '')}
`,
        typescript: `
${importTS('Steps', codeItems)}

<div class="card">
    <Steps model={items} readOnly={false} class="m-2 pt-4" />
</div>

${codeSnippet}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Steps offers item customization with the items <i>snippet</i> property that receives the item instance and returns an element
    </p>
</DocSectionText>
<div class="card">
    <Steps model={items} readOnly={false} class="m-2 pt-4" />
</div>
<DocSectionCode {code} />

{#snippet circleSnippet({ item, index, options: { active, onClick } }: StepMenuItemSnippetProps)}
    <button
        class="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={[
            `background-color: ${active ? 'var(--primary-color)' : 'var(--surface-b)'}`,
            `color: ${active ? 'var(--surface-b)' : 'var(--text-color-secondary)'}`,
            `margin-top: -25px`
        ].join(';')}
        onclick={onClick}
        aria-label={'label_' + index}
    >
        <i class={`${item.icon} text-xl`}></i>
    </button>
{/snippet}

{#snippet squareSnippet({ item, index, options: { active, onClick } }: StepMenuItemSnippetProps)}
    <button
        class="inline-flex align-items-center justify-content-center align-items-center border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={[
            `background-color: ${active ? 'var(--primary-color)' : 'var(--surface-b)'}`,
            `color: ${active ? 'var(--surface-b)' : 'var(--text-color-secondary)'}`,
            `margin-top: -25px`
        ].join(';')}
        onclick={onClick}
        aria-label={'label_' + index}
    >
        <i class={`${item.icon} text-xl`}></i>
    </button>
{/snippet}

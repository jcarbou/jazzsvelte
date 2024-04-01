<script lang="ts">
    import type { Code, CodeLang, CodeMode } from './doc.types'

    import Button from '$lib/components/button/Button.svelte'
    import CodeHighlight from './CodeHighlight.svelte'

    export let embedded: boolean = false
    export let hideToggleCode: boolean = true
    export let codeMode: CodeMode = 'basic'
    export let codeLang: CodeLang = 'javascript'
    export let code: Code
    export let hideStackBlitz: boolean = false
    export let toImport: boolean = false

    const toggleCodeMode = (mode: CodeMode) => {
        if (codeMode === 'data') {
            codeMode = 'javascript'
        } else {
            codeMode = codeMode === 'basic' ? mode : 'basic'
        }
        codeLang = 'javascript'
    }

    const copyCode = async () => {
        let text = code[codeLang]
        if (text) {
            await navigator.clipboard.writeText(text)
        }
    }

    // Todo : migrate
    // import { useCodeEditor } from './codeeditor';
    // const codeEditor = useCodeEditor({ ...props, template: 'vite' });
    const codeEditor = {
        openStackBlitz: (codeLang: CodeLang) => {}
    }
</script>

{#if embedded}
    <div id="embed"></div>
{:else}
    <div class="doc-section-code">
        <div class="doc-section-code-buttons scalein animation-duration-300">
            {#if codeMode !== 'basic' && !hideToggleCode && codeMode !== 'data'}
                <Button
                    class="py-0 px-2 border-round h-2rem shadow-none {codeLang === 'javascript' ? 'code-active' : ''}"
                    label="JS"
                    on:click={() => (codeLang = 'javascript')}
                    tooltip="JavaScript Code"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                ></Button>
                <Button
                    class="py-0 px-2 border-round h-2rem shadow-none {codeLang === 'typescript' ? 'code-active' : ''}"
                    label="TS"
                    on:click={() => (codeLang = 'typescript')}
                    tooltip="TypeScript Code"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                ></Button>
            {/if}
            {#if !hideToggleCode}
                <Button
                    type="button"
                    on:click={() => toggleCodeMode('javascript')}
                    class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none"
                    tooltip="Toggle Full Code"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                >
                    <i class="pi pi-code"></i>
                </Button>
            {/if}
            {#if hideToggleCode && code.data}
                <Button
                    type="button"
                    on:click={() => (codeMode = 'data')}
                    class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none"
                    tooltip="View Data"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                >
                    <i class="pi pi-database"></i>
                </Button>
            {/if}
            {#if !hideStackBlitz}
                <Button
                    type="button"
                    class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none"
                    tooltip="Edit in StackBlitz"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                    on:click={() => codeEditor.openStackBlitz(codeLang)}
                >
                    <svg role="img" viewBox="0 0 13 19" width={13} height={18} fill={'currentColor'} style="display: block;">
                        <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                    </svg>
                </Button>
            {/if}
            <Button
                type="button"
                on:click={copyCode}
                class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none"
                tooltip="Copy Code"
                tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
            >
                <i class="pi pi-copy"></i>
            </Button>
        </div>

        {#if codeMode === 'basic'}
            <CodeHighlight code={code.basic} />
        {:else if codeMode === 'data'}
            <CodeHighlight code={code.data} lang="json" />
        {:else if codeLang === 'javascript'}
            <CodeHighlight code={code.javascript} />
        {:else if codeLang === 'typescript'}
            <CodeHighlight code={code.typescript} />
        {/if}
    </div>
{/if}

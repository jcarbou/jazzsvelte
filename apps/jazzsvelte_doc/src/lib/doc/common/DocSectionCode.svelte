<script lang="ts">
    import type { Code, CodeLang, CodeMode } from './doc.types'

    import { Button } from '@jazzsvelte/button'
    import CodeHighlight from './CodeHighlight.svelte'

    export let embedded: boolean = false
    export let hideToggleCode: boolean = false
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

<style lang="scss">
    .doc-section-code {
        position: relative;

        div {
            &::-webkit-scrollbar {
                width: 5px;
            }
        }

        &:not(:last-child) {
            margin-bottom: 1rem;
        }

        &:hover {
            .doc-section-code-buttons {
                display: flex;
            }
        }
    }

    :global(.doc-section-code-buttons) {
        position: absolute;
        align-items: center;
        justify-content: end;
        z-index: 1;
        top: 0.75rem;
        right: 0.75rem;
        gap: 0.5rem;
        display: none;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 2px;
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.1);

        :global(button) {
            outline: 0 none;
            border-radius: 8px;
            outline-offset: 0;
            background-color: transparent;
            transition:
                background-color 0.2s,
                box-shadow 0.2s;
            border: 0 none;
            color: var(--demo-code-button-color);
            cursor: pointer;
        }

        :global(button:hover) {
            background-color: var(--demo-code-button-hover-bg);
            color: var(--demo-code-button-hover-color);
        }
    }

    :global(.code-active) {
        color: #bbf7d0 !important;
    }

    .doc-section-code-tooltip .p-tooltip-text {
        padding: 0.5rem;
        font-size: 11px;
    }
</style>

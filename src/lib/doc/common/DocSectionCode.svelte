<script lang="ts">
    import type { Code, CodeLang, CodeMode } from './doc.types'

    //import { Button } from '@/components/lib/button/Button'
    //import { CodeHighlight } from './codehighlight';

    export let embedded: boolean = true
    export let hideToggleCode: boolean = true
    export let codeMode: CodeMode = 'basic'
    export let codeLang: CodeLang = 'javascript'
    export let code: Code
    export let hideStackBlitz: boolean = false
    export let codeclass: string = ''

    const toggleCodeMode = (content: CodeMode) => {
        if (codeMode === 'data') {
            codeMode = 'javascript'
        } else {
            codeMode = codeMode === 'basic' ? content : 'basic'
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

<div>Code</div>

<!--{#if embedded}
    <div id="embed"></div>
{:else}
    <div class="doc-section-code">
        <div class="doc-section-code-buttons scalein animation-duration-300">
            {#if codeMode !== 'basic' && !hideToggleCode && codeMode !== 'data'}
                <Button
                    class="py-0 px-2 border-round h-2rem shadow-none"
                    class:code-active={codeLang === 'javascript' && codeMode !== 'data'}
                    label="JS"
                    onClick={() => (codeLang = 'javascript')}
                    tooltip="JavaScript Code"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                ></Button>
                <Button
                    class="py-0 px-2 border-round h-2rem shadow-none"
                    class:code-active={codeLang === 'typescript'}
                    label="TS"
                    onClick={() => (codeLang = 'typescript')}
                    tooltip="TypeScript Code"
                    tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}
                ></Button>
            {/if}
            {#if !hideToggleCode}
                <Button
                    type="button"
                    onClick={() => toggleCodeMode('javascript')}
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
                    onClick={() => (codeMode = 'data')}
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
                    onClick={() => codeEditor.openStackBlitz(codeLang)}
                >
                    <svg role="img" viewBox="0 0 13 19" width={13} height={18} fill={'currentColor'} style={{ display: 'block' }}>
                        <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                    </svg>
                </Button>
            {/if}
            <Button type="button" onClick={copyCode} class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none" tooltip="Copy Code" tooltipOptions={{ position: 'bottom', class: 'doc-section-code-tooltip' }}>
                <i class="pi pi-copy"></i>
            </Button>
        </div>

        {#if codeMode === 'basic'}
            <div class={codeclass}>
                <CodeHighlight code {...props}>
                    {code.basic}
                </CodeHighlight>
            </div>
        {:else if codeMode === 'data'}
            <div class={codeclass}>
                <CodeHighlight code lang="json">
                    {code.data}
                </CodeHighlight>
            </div>
        {:else if codeMode !== 'basic' && codeLang === 'javascript'}
            <div class={codeclass}>
                <CodeHighlight code>{code.javascript}</CodeHighlight>
            </div>
        {:else if codeMode !== 'basic' && codeLang === 'typescript'}
            <div class={codeclass}>
                <CodeHighlight code lang={'tsx'}>
                    {code.typescript}
                </CodeHighlight>
            </div>
        {/if}
    </div>
{/if}
-->

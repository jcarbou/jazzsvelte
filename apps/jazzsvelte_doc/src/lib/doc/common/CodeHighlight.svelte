<script lang="ts">
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/themes/prism-dark.css'
    import { slide } from 'svelte/transition'

    interface Props {
        lang?: string
        style?: string | null
        code?: string | null
    }

    let { lang = 'svelte', style = null, code = null }: Props = $props()
    let htmlCode = $derived(Prism.highlight(code || '', Prism.languages[lang], lang))
    let languageClass = $derived(`language-${lang || 'svelte'}`)
</script>

<div transition:slide>
    <div class="code-toolbar">
        <pre {style} tabIndex="-1" class="{languageClass} preLanguage">
            <code class="{languageClass} codeLanguage">{@html htmlCode}</code>
        </pre>
    </div>
</div>

<style>
    .preLanguage {
        display: flex;
        position: relative;
        background: var(--demo-code-bg);
        margin: 0;
        padding: 0;
        max-height: 40rem;
        min-height: 4rem;
        height: inherite;
        overflow: auto;
        color-scheme: dark;
        border: none;
        border-radius: 0.5rem;
        font-family:
            ui-monospace,
            SFMono-Regular,
            SF Mono,
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    .codeLanguage {
        flex: 1;
        border-left: 1rem solid transparent;
        box-shadow: none;
        margin: 0;
        font-size: 14px;
        border-radius: 10px;
        color: #fff;
        min-height: inherit;
        max-height: inherit;
        height: inherit;
        padding: 0 1rem;
        padding-bottom: 1rem;
        display: block;
        overflow: auto;
        font-family:
            ui-monospace,
            SFMono-Regular,
            SF Mono,
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }
</style>

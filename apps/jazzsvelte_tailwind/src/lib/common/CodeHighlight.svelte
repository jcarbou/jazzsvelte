<script lang="ts">
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/themes/prism-dark.css'
    import { slide } from 'svelte/transition'

    export let lang: string = 'svelte'
    export let style: string | null = null
    export let code: string | null = null

    $: htmlCode = Prism.highlight(code || '', Prism.languages[lang], lang)
    $: languageClass = `language-${lang || 'svelte'}`
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
        background: rgb(55, 65, 81);
        margin: 0;
        padding: 0;
        max-height: 40rem;
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
        border-left: 1rem solid transparent;
        box-shadow: none;
        margin: 0;
        font-size: 14px;
        border-radius: 10px;
        color: #fff;
        max-height: inherit;
        height: inherit;
        padding: 0 1rem;
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

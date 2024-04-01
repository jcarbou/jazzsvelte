<script lang="ts">
    //import { codeHighlight } from './codeHighlight.action'
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/themes/prism-dark.css'

    export let lang: string = 'svelte'
    export let style: string | null = null
    export let code: string | null = null

    $: htmlCode = Prism.highlight(code || '', Prism.languages[lang], lang)
    $: languageClass = `language-${lang || 'svelte'}`
</script>

<div>
    <div class="code-toolbar">
        <pre {style} tabIndex="-1" class={languageClass}>
            <code class={languageClass}>
                {@html htmlCode}&nbsp;
            </code>
        </pre>
    </div>
</div>

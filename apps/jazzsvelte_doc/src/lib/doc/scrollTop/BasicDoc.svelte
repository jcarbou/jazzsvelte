<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ScrollTop } from '@jazzsvelte/scroll_top'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ScrollTop />
        `,
        javascript: `
${importJS('ScrollTop')}

<div class="card flex flex-column align-items-center" style="height:2000px;">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style="font-size:2rem;"></i>
    <ScrollTop />
</div>
`,
        typescript: `
${importTS('ScrollTop')}

<div class="card flex flex-column align-items-center" style="height:2000px;">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style="font-size:2rem;"></i>
    <ScrollTop />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>ScrollTop listens window scroll by default.</p>
</DocSectionText>
<div class="card flex flex-column align-items-center">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i
        class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite text-2xl"
        style="font-size:2rem;margin-bottom:30rem;"
    ></i>
    <ScrollTop />
</div>
<DocSectionCode {code} />

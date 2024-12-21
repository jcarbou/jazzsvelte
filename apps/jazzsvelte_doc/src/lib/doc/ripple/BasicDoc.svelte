<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Ripple } from '@jazzsvelte/ripple'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { simpleCode } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Ripple'],
        `
<div
    class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple"
>
    Click Me
    <Ripple />
</div>
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        Ripple is enabled by adding the component as a child and applying <i>p-ripple</i> class to the element.
    </p>
</DocSectionText>
<div class="card flex justify-content-center align-items-center">
    <div
        class="bg-primary flex select-none justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple"
    >
        Click Me
        <Ripple />
    </div>
</div>
<DocSectionCode {code} />

<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Tag } from '@jazzsvelte/tag'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Tag style="background:linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%);">
    <div class="flex align-items-center gap-2">
        <img alt="Country" src="/images/flag/flag_placeholder.png" class="flag flag-it" style="width:18px;"/>
        <span class="text-base">Italy</span>
        <i class="pi pi-times text-xs"></i>
    </div>
</Tag>
 `,
        javascript: `
${importJS('Tag')}

<Tag style="background:linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%);">
    <div class="flex align-items-center gap-2">
        <img alt="Country" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            class="flag flag-it" style="width:18px;"/>
        <span class="text-base">Italy</span>
        <i class="pi pi-times text-xs"></i>
    </div>
</Tag>
`,
        typescript: `
${importTS('Tag')}

<Tag style="background:linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%);">
    <div class="flex align-items-center gap-2">
        <img alt="Country" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            class="flag flag-it" style="width:18px;"/>
        <span class="text-base">Italy</span>
        <i class="pi pi-times text-xs"></i>
    </div>
</Tag>
`
    }
</script>

<DocSectionText {docSection}>
    <p>Children of the component are passed as the content for templating.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Tag style="background:linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%);">
        <div class="flex align-items-center gap-2">
            <img
                alt="Country"
                src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                class="flag flag-it"
                style="width:18px;"
            />
            <span class="text-base">Italy</span>
            <i class="pi pi-times text-xs" />
        </div>
    </Tag>
</div>
<DocSectionCode {code} />

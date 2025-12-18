<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Skeleton } from '@jazzsvelte/skeleton'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<div class="border-round border-1 surface-border p-4 surface-card">
    <div class="flex mb-3">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
        </div>
    </div>
    <Skeleton width="100%" height="150px"></Skeleton>
    <div class="flex justify-content-between mt-3">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
    </div>
</div>
        `,
        javascript: `
${importJS('Skeleton')}

<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</div>
`,
        typescript: `
${importTS('Skeleton')}

<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</div
`
    }
</script>

<DocSectionText {docSection}>
    <p>Sample Card implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
</DocSectionText>
<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
            <Skeleton shape="circle" size="4rem" class="mr-2" />
            <div>
                <Skeleton width="10rem" class="mb-2" />
                <Skeleton width="5rem" class="mb-2" />
                <Skeleton height=".5rem" />
            </div>
        </div>
        <Skeleton width="100%" height="150px" />
        <div class="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem" />
            <Skeleton width="4rem" height="2rem" />
        </div>
    </div>
</div>
<DocSectionCode {code} />

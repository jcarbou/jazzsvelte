<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Skeleton } from '@jazzsvelte/skeleton'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<h5>Rectangle</h5>
<Skeleton class="mb-2"></Skeleton>
<Skeleton width="10rem" class="mb-2"></Skeleton>
<Skeleton width="5rem" class="mb-2"></Skeleton>
<Skeleton height="2rem" class="mb-2"></Skeleton>
<Skeleton width="10rem" height="4rem"></Skeleton>

<h5>Rounded</h5>
<Skeleton class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
<Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>

<h5 class="mt-3">Square</h5>
<Skeleton size="2rem" class="mr-2"></Skeleton>
<Skeleton size="3rem" class="mr-2"></Skeleton>
<Skeleton size="4rem" class="mr-2"></Skeleton>
<Skeleton size="5rem"></Skeleton>

<h5 class="mt-3">Circle</h5>
<Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="5rem"></Skeleton>
        `,
        javascript: `
${importJS('Skeleton')}

<div class="card">
    <div class="flex flex-wrap">
        <div class="w-full md:w-6 p-3">
            <h5>Rectangle</h5>
            <Skeleton class="mb-2"></Skeleton>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2"></Skeleton>
            <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Rounded</h5>
            <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Square</h5>
            <div class="flex align-items-end">
                <Skeleton size="2rem" class="mr-2"></Skeleton>
                <Skeleton size="3rem" class="mr-2"></Skeleton>
                <Skeleton size="4rem" class="mr-2"></Skeleton>
                <Skeleton size="5rem"></Skeleton>
            </div>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Circle</h5>
            <div class="flex align-items-end">
                <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="5rem"></Skeleton>
            </div>
        </div>
    </div>
</div>
`,
        typescript: `
${importTS('Skeleton')}

<div class="card">
    <div class="flex flex-wrap">
        <div class="w-full md:w-6 p-3">
            <h5>Rectangle</h5>
            <Skeleton class="mb-2"></Skeleton>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2"></Skeleton>
            <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Rounded</h5>
            <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Square</h5>
            <div class="flex align-items-end">
                <Skeleton size="2rem" class="mr-2"></Skeleton>
                <Skeleton size="3rem" class="mr-2"></Skeleton>
                <Skeleton size="4rem" class="mr-2"></Skeleton>
                <Skeleton size="5rem"></Skeleton>
            </div>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Circle</h5>
            <div class="flex align-items-end">
                <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="5rem"></Skeleton>
            </div>
        </div>
    </div>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Various shapes and sizes can be created using styling properties like <i>shape</i>, <i>width</i>, <i>height</i>,
        <i>borderRadius</i>
        and <i>class</i>.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap">
        <div class="w-full md:w-6 p-3">
            <h5>Rectangle</h5>
            <Skeleton class="mb-2" />
            <Skeleton width="10rem" class="mb-2" />
            <Skeleton width="5rem" class="mb-2" />
            <Skeleton height="2rem" class="mb-2" />
            <Skeleton width="10rem" height="4rem" />
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Rounded</h5>
            <Skeleton class="mb-2" borderRadius="16px" />
            <Skeleton width="10rem" class="mb-2" borderRadius="16px" />
            <Skeleton width="5rem" borderRadius="16px" class="mb-2" />
            <Skeleton height="2rem" class="mb-2" borderRadius="16px" />
            <Skeleton width="10rem" height="4rem" borderRadius="16px" />
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Square</h5>
            <div class="flex align-items-end">
                <Skeleton size="2rem" class="mr-2" />
                <Skeleton size="3rem" class="mr-2" />
                <Skeleton size="4rem" class="mr-2" />
                <Skeleton size="5rem" />
            </div>
        </div>
        <div class="w-full md:w-6 p-3">
            <h5>Circle</h5>
            <div class="flex align-items-end">
                <Skeleton shape="circle" size="2rem" class="mr-2" />
                <Skeleton shape="circle" size="3rem" class="mr-2" />
                <Skeleton shape="circle" size="4rem" class="mr-2" />
                <Skeleton shape="circle" size="5rem" />
            </div>
        </div>
    </div>
</div>
<DocSectionCode {code} />

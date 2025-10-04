<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Skeleton } from '@jazzsvelte/skeleton'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<div class="border-round border-1 surface-border p-4">
    <ul class="m-0 p-0 list-none">
        <li class="mb-3">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div style="flex:1;">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div style="flex:1;">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div style="flex:1;">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div style="flex:1;">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
    </ul>
</div>
        `,
        javascript: `
${importJS('Skeleton')}

<div class="card">
    <div class="border-round border-1 surface-border p-4">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
`,
        typescript: `
${importTS('Skeleton')}

<div class="card">
    <div class="border-round border-1 surface-border p-4">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>Sample List implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
</DocSectionText>
<div class="card">
    <div class="border-round border-1 surface-border p-4">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2" />
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2" />
                        <Skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2" />
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2" />
                        <Skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2" />
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2" />
                        <Skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <Skeleton shape="circle" size="4rem" class="mr-2" />
                    <div style="flex:1;">
                        <Skeleton width="100%" class="mb-2" />
                        <Skeleton width="75%" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
<DocSectionCode {code} />

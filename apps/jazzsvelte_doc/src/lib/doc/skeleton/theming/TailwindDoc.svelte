<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {          
    skeleton: {
        root: ({ props }) => ({
            class: classs(
                'overflow-hidden',
                '!mb-2',
                'bg-gray-300 dark:bg-gray-800',
                'after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-blue-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse',
                {
                    'rounded-md': props.shape !== 'circle',
                    'rounded-full': props.shape == 'circle'
                }

        })
    }

    `
    }

    const code2 = {
        javascript: `
${importJS('Skeleton')}import { Skeleton } from 'primereact/skeleton';

        <div class="card text-gray-700 dark:text-white/80">
            <div class="w-full">
                <h5>Rectangle</h5>
                <Skeleton class="mb-2"></Skeleton>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2"></Skeleton>
                <Skeleton width="10rem" height="4rem"></Skeleton>
            </div>
            <div class="w-full">
                <h5>Rounded</h5>
                <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
            </div>
            <div class="w-full">
                <h5>Square</h5>
                <div class="flex items-end">
                    <Skeleton size="2rem" class="mr-2"></Skeleton>
                    <Skeleton size="3rem" class="mr-2"></Skeleton>
                    <Skeleton size="4rem" class="mr-2"></Skeleton>
                    <Skeleton size="5rem"></Skeleton>
                </div>
            </div>
            <div class="w-full ">
                <h5>Circle</h5>
                <div class="flex items-end">
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="5rem"></Skeleton>
                </div>
            </div>
      </div>


    `
    }
</script>

<DocSectionText {docSection}>
    <p>
        PrimeReact offers a built-in Tailwind theme to get you started quickly. The default values related to the component are
        displayed below. The component can easily be styled with your own design based on Tailwind utilities, see the{' '}
        <a href="/tailwind">Tailwind Customization</a> section for an example.
    </p>
    <DocSectionCode {code} hideToggleCode toImport hideStackBlitz />
    <p>A playground sample with the pre-built Tailwind theme.</p>
    <DocSectionCode code={code2} embedded />
</DocSectionText>

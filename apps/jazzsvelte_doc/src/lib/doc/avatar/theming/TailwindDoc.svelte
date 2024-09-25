<script lang="ts">
    import { importJS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
const Tailwind = {           
    avatar: {
        root: ({ props, state }) => ({
            class: classs(
                'flex items-center justify-center',
                'bg-gray-300 dark:bg-gray-800',
                {
                    'rounded-lg': props.shape == 'square',
                    'rounded-full': props.shape == 'circle'
                },
                {
                    'text-base h-8 w-8': props.size == null || props.size == 'normal',
                    'w-12 h-12 text-xl': props.size == 'large',
                    'w-16 h-16 text-2xl': props.size == 'xlarge'
                },
                {
                    '-ml-4 border-2 border-white dark:border-gray-900': state.isNestedInAvatarGroup
                }

        }),
        image: 'h-full w-full'
    },
    avatargroup: {
        root: 'flex items-center'
    }

    `
    }

    const code2 = {
        javascript: `
${importJS(['Avatar', 'AvatarGroup', 'Badge'])}
<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5 class="text-gray-700 dark:text-white/80">Image</h5>
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5 class="text-gray-700 dark:text-white/80">Badge</h5>
            <Avatar class="relative" image="https://primefaces.org/cdn/primereact/images/organization/walter.jpg" size="xlarge">
                <Badge class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-top-right m-0" value="4" severity="danger" />
            </Avatar>
        </div>

        <div class="flex-auto">
            <h5 class="text-gray-700 dark:text-white/80">Gravatar</h5>
            <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} class="flex align-items-center justify-content-center mr-2" size="xlarge" />
        </div>
    </div>
</div>

<div class="card flex justify-content-center">
    <AvatarGroup>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large" style="background-color:#9c27b0;color:#ffffff;" />
    </AvatarGroup>
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

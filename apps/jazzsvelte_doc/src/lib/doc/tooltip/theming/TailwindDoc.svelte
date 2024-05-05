<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
const Tailwind = {
    tooltip: {
        root: ({ context }) => {
                class: classs('absolute shadow-md', {
                    'py-0 px-1': context.right || context.left || (!context.right && !context.left && !context.top && !context.bottom),
                    'py-1 px-0': context.top || context.bottom
                })
            };
        },
        arrow: ({ context }) => ({
            class: classs('absolute w-0 h-0 border-transparent border-solid', {
                '-mt-1 border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-gray-600': context.right,
                '-mt-1 border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-gray-600': context.left,
                '-ml-1 border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-gray-600': context.top,
                '-ml-1 border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-gray-600': context.bottom
            })
        }),
        text: {
            class: 'p-3 bg-gray-600 text-white rounded-md whitespace-pre-line break-words'
        }
    }

        `
    }

    const code2 = {
        javascript: `
${importJS(['Tooltip', 'InputText'])}

<div class="card flex flex-wrap justify-center gap-2">
    <InputText type="text" placeholder="Right" tooltip="Enter your username" />
    <InputText type="text" placeholder="Top" tooltip="Enter your username" tooltipOptions={{ position: 'top' }} />
    <InputText type="text" placeholder="Bottom" tooltip="Enter your username" tooltipOptions={{ position: 'bottom' }} />
    <InputText type="text" placeholder="Left" tooltip="Enter your username" tooltipOptions={{ position: 'left' }} />
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

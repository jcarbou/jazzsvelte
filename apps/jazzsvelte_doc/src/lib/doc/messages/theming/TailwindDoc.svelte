<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {  
    messages: {
        root: ({ state, index }) => {
                class: classs('my-4 rounded-md', {
                    'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': state.messages[index] && state.messages[index].message.severity == 'info',
                    'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': state.messages[index] && state.messages[index].message.severity == 'success',
                    'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': state.messages[index] && state.messages[index].message.severity == 'warn',
                    'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': state.messages[index] && state.messages[index].message.severity == 'error'
                })
            };
        },
        wrapper: 'flex items-center py-5 px-7',
        icon: {
            class: classs('w-6 h-6', 'text-lg mr-2')
        },
        text: 'text-base font-normal',
        button: {
            class: classs('w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30')
        },
        transition: {
            enterFromClass: 'opacity-0',
            enterActiveClass: 'transition-opacity duration-300',
            leaveFromClass: 'max-h-40',
            leaveActiveClass: 'overflow-hidden transition-all duration-300 ease-in',
            leaveToClass: 'max-h-0 opacity-0 !m-0'
        }
    }

        `
    }

    const code2 = {
        javascript: `
${importJS('Messages')}import { useMountEffect } from 'primereact/hooks';


    const msgs = useRef(null);

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content' },
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content' },
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content' },
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content' }
            ]);
        }
    });
        <div class="card">
            <Messages ref={msgs} />
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

<script lang="ts">
    import { importJS, importTS, projectName } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
const Tailwind = {  
    toast: {
        root: {
            class: classs('w-96', 'opacity-90')
        },
        message: ({ state, index }) => ({
            class: classs('my-4 rounded-md w-full', {
                'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': state.messages[index] && state.messages[index].message.severity == 'info',
                'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': state.messages[index] && state.messages[index].message.severity == 'success',
                'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': state.messages[index] && state.messages[index].message.severity == 'warn',
                'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': state.messages[index] && state.messages[index].message.severity == 'error'
            })
        }),
        content: 'flex items-center py-5 px-7',
        icon: {
            class: classs('w-6 h-6', 'text-lg mr-2')
        },
        text: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4',
        summary: 'font-bold block',
        detail: 'mt-1 block',
        closebutton: {
            class: classs('w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30')
        },
        transition: {
            enterFromClass: 'opacity-0 translate-x-0 translate-y-2/4 translate-z-0',
            enterActiveClass: 'transition-transform transition-opacity duration-300',
            leaveFromClass: 'max-h-40',
            leaveActiveClass: 'transition-all duration-500 ease-in',
            leaveToClass: 'max-h-0 opacity-0 mb-0 overflow-hidden'
        }
    }

        `
    }

    const code2 = {
        javascript: `
${importJS(
    ['Toast', 'Button'],
    `import {showToast}  from 'toast/toast.store'
    
const showSuccess = () => {
    showToast({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
}

const showInfo = () => {
    showToast({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
}

const showWarn = () => {
    showToast({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});
}

const showError = () => {
    showToast({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
}`
)}

<div class="card flex justify-center">
    <div class="flex flex-wrap gap-2">
        <Button label="Success" severity="success" on:click={showSuccess} />
        <Button label="Info" severity="info" on:click={showInfo} />
        <Button label="Warn" severity="warning" on:click={showWarn} />
        <Button label="Error" severity="danger" on:click={showError} />
    </div>
</div>

<!-- <Toast/> must be inserted in your main page -->
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

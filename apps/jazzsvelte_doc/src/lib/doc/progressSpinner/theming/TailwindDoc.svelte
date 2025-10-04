<script lang="ts">
    import { importJS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {          
    global: {
        css: \`
        .progress-spinner-circle {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: 0;
            animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
            stroke-linecap: round;
        }

        @keyframes p-progress-spinner-dash{
            0% {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
            }
            
            50% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -35px;
            }
            100% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -124px;
            }
        }
        @keyframes p-progress-spinner-color {
            100%, 0% {
                stroke: #ff5757;
            }
            40% {
                stroke: #696cff;
            }
            66% {
                stroke: #1ea97c;
            }
            80%, 90% {
                stroke: #cc8925;
            }
        }
    \`
    },        
    progressspinner: {
        root: {
            class: classs('relative mx-auto w-28 h-28 inline-block', 'before:block before:pt-full')
        },
        spinner: 'absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-full transform origin-center animate-spin',
        circle: 'text-red-500 progress-spinner-circle'
    }

    `
    }

    const code2 = {
        javascript: `
${importJS('ProgressSpinner')}import { ProgressSpinner } from 'primereact/progressspinner';

        <div class="card flex justify-content-center">
            <ProgressSpinner />
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

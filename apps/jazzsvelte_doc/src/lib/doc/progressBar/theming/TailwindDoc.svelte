<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
const Tailwind = {          
    global: {
        css: \`
        .progressbar-value-animate::after {
            will-change: left, right;
            animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        }
        .progressbar-value-animate::before {
            will-change: left, right;
            animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }
        @keyframes p-progressbar-indeterminate-anim {
            0% {
                left: -35%;
                right: 100%;
            }
            60% {
                left: 100%;
                right: -90%;
            }
            100% {
                left: 100%;
                right: -90%;
            }
        }
    \`
    },          
    progressbar: {
        root: {
            class: classs('overflow-hidden relative', 'border-0 h-6 bg-gray-200 rounded-md dark:bg-gray-800')
        },
        value: ({ props }) => ({
            class: classs('border-0 m-0 bg-blue-500', {
                'transition-width duration-1000 ease-in-out absolute items-center border-0 flex h-full justify-center overflow-hidden w-0': props.mode !== 'indeterminate',
                'progressbar-value-animate before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000': props.mode == 'indeterminate'
            })
        }),
        label: {
            class: classs('inline-flex', 'text-white leading-6')
        }
    }

    `
    }

    const code2 = {
        javascript: `
${importJS('ProgressBar')}import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';

    
    const toast = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        let _val = value;

        interval.current = setInterval(() => {
            _val += Math.floor(Math.random() * 10) + 1;

            if (_val >= 100) {
                _val = 100;
                showToast({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                clearInterval(interval.current);
            }

            setValue(_val);
        }, 2000);
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        };
    }, []);
        <div>
            <div class="card">
                <ProgressBar value={50}></ProgressBar>
            </div>

            <div class="card">
                <Toast ref={toast}></Toast>
                <ProgressBar value={value}></ProgressBar>
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

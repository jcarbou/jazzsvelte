<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    import Toast from '$lib/components/toast/Toast.svelte'
    //import ProgressBar from '$lib/components/progressbar/ProgressBar.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { closeToast, showToast } from '$lib/components/toast/toastr.store'
    import { writable, type Writable } from 'svelte/store'
    import HeadlessToast from './HeadlessToast.svelte'

    export let docSection: DocSection

    const progress: Writable<number> = writable(0)
    let interval: ReturnType<typeof setInterval> | null = null
    let toastId: string | null = null

    function clear() {
        $progress = 0
        toastId && closeToast(toastId)
        interval && clearInterval(interval)
        interval = null
    }

    function show() {
        if (!interval) {
            toastId = showToast({
                toastId: 'headless',
                summary: 'Uploading your files.',
                progress,
                clear
            })

            $progress = 0

            if (interval) {
                clearInterval(interval)
            }

            interval = setInterval(() => {
                $progress = Math.min($progress + 20, 100)
                if ($progress >= 100 && interval) {
                    clearInterval(interval)
                    interval = null
                }
            }, 1000)
        }
    }

    const code = {
        basic: `
<Toast
    ref={toast}
    content={({ message }) => (
        <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
            <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
            <div class="flex flex-column gap-3 w-full">
                <p class="m-0 font-semibold text-base text-white">{message.summary}</p>
                <p class="m-0 text-base text-700">{message.detail}</p>
                <div class="flex flex-column gap-2">
                    <ProgressBar value={progress} showValue="false"></ProgressBar>
                    <label class="text-right text-xs text-white">{progress}% uploaded...</label>
                </div>
                <div class="flex gap-3 mb-3">
                    <Button label="Another Upload?" text class="p-0" on:click={clear}></Button>
                    <Button label="Cancel" text class="text-white p-0" on:click={clear}></Button>
                </div>
            </div>
        </section>
    )}
></Toast>
<Button on:click={show} label="View" />
            `,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';

import { ProgressBar } from 'primereact/progressbar';

    const toast = useRef(null);
    
    const interval = useRef(null);

        setProgress(0);
        toast.current.clear();
        clearInterval(interval.current);
        interval.current = undefined;
    };

         if (!interval.current) {
            toast.current.show({
                summary: 'Uploading your files.',
            });

            setProgress(0);

            if (interval.current) {
                clearInterval(interval.current);
            }

            interval.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 20;

                    if (newProgress >= 100) {
                        clearInterval(interval.current);
                    }
                });
            }, 1000);
        }
    };
        <div class="card flex justify-content-center">
            <Toast
                ref={toast}
                content={({ message }) => (
                    <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
                        <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div class="flex flex-column gap-3 w-full">
                            <p class="m-0 font-semibold text-base text-white">{message.summary}</p>
                            <p class="m-0 text-base text-700">{message.detail}</p>
                            <div class="flex flex-column gap-2">
                                <ProgressBar value={progress} showValue="false"></ProgressBar>
                                <label class="text-right text-xs text-white">{progress}% uploaded...</label>
                            </div>
                            <div class="flex gap-3 mb-3">
                                <Button label="Another Upload?" text class="p-0" on:click={clear}></Button>
                                <Button label="Cancel" text class="text-white p-0" on:click={clear}></Button>
                            </div>
                        </div>
                    </section>
                )}
            ></Toast>
            <Button on:click={show} label="View" />
        </div>

            `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';

import { ProgressBar } from 'primereact/progressbar';

    const toast = useRef<Toast>(null);

        setProgress(0);
        toast.current.clear();
        clearInterval(interval.current);
        interval.current = undefined;
    };

         if (!interval.current) {
            toast.current.show({
                summary: 'Uploading your files.',
            });

            setProgress(0);

            if (interval.current) {
                clearInterval(interval.current);
            }

            interval.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 20;

                    if (newProgress >= 100) {
                        clearInterval(interval.current);
                    }
                });
            }, 1000);
        }
    };
        <div class="card flex justify-content-center">
            <Toast
                ref={toast}
                content={({ message }) => (
                    <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
                        <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div class="flex flex-column gap-3 w-full">
                            <p class="m-0 font-semibold text-base text-white">{message.summary}</p>
                            <p class="m-0 text-base text-700">{message.detail}</p>
                            <div class="flex flex-column gap-2">
                                <ProgressBar value={progress} showValue="false"></ProgressBar>
                                <label class="text-right text-xs text-white">{progress}% uploaded...</label>
                            </div>
                            <div class="flex gap-3 mb-3">
                                <Button label="Another Upload?" text class="p-0" on:click={clear}></Button>
                                <Button label="Cancel" text class="text-white p-0" on:click={clear}></Button>
                            </div>
                        </div>
                    </section>
                )}
            ></Toast>
            <Button on:click={show} label="View" />
        </div>

            `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Headless mode is enabled by defining a <i>content</i> prop that lets you implement entire dialog UI instead of the default
        elements.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Toast id="headless" position="top-center" content={HeadlessToast} />
    <Button on:click={show} label="View" />
</div>
<DocSectionCode {code} />

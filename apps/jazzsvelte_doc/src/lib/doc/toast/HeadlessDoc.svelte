<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ToastMessageProps, ToastMessageStatus, ToastSnippet } from '@jazzsvelte/toast'
    //import ProgressBar from '$lib/components/progressbar/ProgressBar.svelte'    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { closeToast, showToast } from '@jazzsvelte/toast'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let progress: number = $state(0)
    let interval: ReturnType<typeof setInterval> | null = null
    let toastMessage: ToastMessageStatus | null = null

    function clear() {
        progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show(customMessage: ToastSnippet) {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage
            })

            progress = 0

            if (interval) {
                clearInterval(interval)
            }

            interval = setInterval(() => {
                progress = Math.min(progress + 20, 100)
                if (progress >= 100 && interval) {
                    clearInterval(interval)
                    interval = null
                }
            }, 1000)
        }
    }

    const codeSnippet = `
    <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
        <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
        <div class="flex flex-column gap-3 w-full">
            <p class="m-0 font-semibold text-base text-white">{summary}</p>
            <p class="m-0 text-base text-700">{detail}</p>
            <div class="flex flex-column gap-2">
                <!--  NOT_IMPLEMENTED <ProgressBar value={progress} showValue="false"></ProgressBar>-->
                <label class="text-right text-xs text-white">{progress}% uploaded...</label>
            </div>
            <div class="flex gap-3 mb-3">
                <Button label="Another Upload?" text class="p-0" onclick={clear}></Button>
                <Button label="Cancel" text class="text-white p-0" onclick={clear}></Button>
            </div>
        </div>
    </section>
`
    const codeButton = `
<Button onclick={() => show(headlessContent)} label="View" />
 `
    const code = {
        basic: `
showToast({
    toastId: 'topCenter',
    summary: 'Uploading your files.',
    customMessage
})
 `,
        javascript: `
${importJS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let progress = $state(0)
    let intervall = null
    let toastMessage = null

    function clear() {
        progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show(customMessage) {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage
            })

            progress = 0

            if (interval) {
                clearInterval(interval)
            }

            interval = setInterval(() => {
                progress = Math.min(progress + 20, 100)
                if (progress >= 100 && interval) {
                    clearInterval(interval)
                    interval = null
                }
            }, 1000)
        }
    }`
)}

{#snippet headlessContent({ summary, detail })}
${codeSnippet}
{/snippet}
${codeButton}
`,
        typescript: `
${importTS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    `
    let progress: number = $state(0)
    let interval: ReturnType<typeof setInterval> | null = null
    let toastMessage: ToastMessageStatus | null = null

    function clear() {
        progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show(customMessage: ToastSnippet) {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage
            })

            progress = 0

            if (interval) {
                clearInterval(interval)
            }

            interval = setInterval(() => {
                progress = Math.min(progress + 20, 100)
                if (progress >= 100 && interval) {
                    clearInterval(interval)
                    interval = null
                }
            }, 1000)
        }
    }`
)}

{#snippet headlessContent({ summary, detail }:ToastMessageProps)}
${codeSnippet}
{/snippet}
${codeButton}
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
    {#snippet headlessContent({ summary, detail }: ToastMessageProps)}
        <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
            <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
            <div class="flex flex-column gap-3 w-full">
                <p class="m-0 font-semibold text-base text-white">{summary}</p>
                <p class="m-0 text-base text-700">{detail}</p>
                <div class="flex flex-column gap-2">
                    <!--  NOT_IMPLEMENTED <ProgressBar value={progress} showValue="false"></ProgressBar>-->
                    <label class="text-right text-xs text-white">{progress}% uploaded...</label>
                </div>
                <div class="flex gap-3 mb-3">
                    <Button label="Another Upload?" text class="p-0" onclick={clear}></Button>
                    <Button label="Cancel" text class="text-white p-0" onclick={clear}></Button>
                </div>
            </div>
        </section>
    {/snippet}

    <Button onclick={() => show(headlessContent)} label="View" />
</div>
<DocSectionCode {code} />

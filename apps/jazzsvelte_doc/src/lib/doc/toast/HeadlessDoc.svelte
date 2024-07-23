<script lang="ts">
    import { importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ToastMessageStatus } from '@jazzsvelte/toast'
    //import ProgressBar from '$lib/components/progressbar/ProgressBar.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { closeToast, showToast } from '@jazzsvelte/toast'
    import { writable, type Writable } from 'svelte/store'
    import HeadlessToastMessage from './HeadlessToastMessage.svelte'

    export let docSection: DocSection

    const progress: Writable<number> = writable(0)
    let interval: ReturnType<typeof setInterval> | null = null
    let toastMessage: ToastMessageStatus | null = null

    function clear() {
        $progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show() {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage: HeadlessToastMessage,
                customProps: {
                    progress,
                    clear
                }
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
showToast({
    toastId: 'topCenter',
    summary: 'Uploading your files.',
    customMessage: HeadlessToastMessage,
    customProps: {
        progress,
        clear
    }
})
            `,
        javascript: `
        // Parent
${importJS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    "import { writable } from 'svelte/store'",
    "import HeadlessToastMessage from './HeadlessToastMessage'",
    `
    const progress = writable(0)
    let interval = null
    let toastMessage = null

    function clear() {
        $progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show() {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage: HeadlessToastMessage,
                customProps: {
                    progress,
                    clear
                }
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
    }`
)}

<Button on:click={show} label="View" />

// Custom Message : HeadlessToastMessage
${importJS(
    ['Button'],
    `export let summary = null
    export let detail = null
    export let progress
    export let clear`
)}

<section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
    <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
    <div class="flex flex-column gap-3 w-full">
        <p class="m-0 font-semibold text-base text-white">{summary}</p>
        <p class="m-0 text-base text-700">{detail}</p>
        <div class="flex flex-column gap-2">
            <!--  NOT_IMPLEMENTED <ProgressBar value={progress} showValue="false"></ProgressBar>-->
            <label class="text-right text-xs text-white">{$progress}% uploaded...</label>
        </div>
        <div class="flex gap-3 mb-3">
            <Button label="Another Upload?" text class="p-0" on:click={clear}></Button>
            <Button label="Cancel" text class="text-white p-0" on:click={clear}></Button>
        </div>
    </div>
</section>
     `,
        typescript: `
// Parent
${importTS(
    ['Button'],
    importType('ToastMessageStatus', 'toast'),
    importObject('showToast', 'toast'),
    importObject('closeToast', 'toast'),
    "import { writable, type Writable } from 'svelte/store'",
    "import HeadlessToastMessage from './HeadlessToastMessage'",
    `
    const progress: Writable<number> = writable(0)
    let interval: ReturnType<typeof setInterval> | null = null
    let toastMessage: ToastMessageStatus | null = null

    function clear() {
        $progress = 0
        toastMessage && closeToast(toastMessage)
        interval && clearInterval(interval)
        interval = null
    }

    function show() {
        if (!interval) {
            toastMessage = showToast({
                toastId: 'topCenter',
                summary: 'Uploading your files.',
                customMessage: HeadlessToastMessage,
                customProps: {
                    progress,
                    clear
                }
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
    }`
)}

<Button on:click={show} label="View" />

// Custom Message : HeadlessToastMessage
${importTS(
    ['Button'],
    "import type { Writable } from 'svelte/store'",
    `export let summary: string | null = null
    export let detail: string | null = null
    export let progress: Writable<number>
    export let clear: () => void`
)}

<section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 fadeindown" style="border-radius:10px;">
    <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
    <div class="flex flex-column gap-3 w-full">
        <p class="m-0 font-semibold text-base text-white">{summary}</p>
        <p class="m-0 text-base text-700">{detail}</p>
        <div class="flex flex-column gap-2">
            <!--  NOT_IMPLEMENTED <ProgressBar value={progress} showValue="false"></ProgressBar>-->
            <label class="text-right text-xs text-white">{$progress}% uploaded...</label>
        </div>
        <div class="flex gap-3 mb-3">
            <Button label="Another Upload?" text class="p-0" on:click={clear}></Button>
            <Button label="Cancel" text class="text-white p-0" on:click={clear}></Button>
        </div>
    </div>
</section>
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
    <Button on:click={show} label="View" />
</div>
<DocSectionCode {code} />

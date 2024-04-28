<script lang="ts">
    import Button from '$lib/components/button/Button.svelte'
    import type { Writable } from 'svelte/store'

    export let summary: string | null = null
    export let detail: string | null = null
    export let progress: Writable<number>
    export let clear: () => void
</script>

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

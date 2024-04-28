<script lang="ts">
    import Button from '$lib/components/button/Button.svelte'

    export let summary: string | null = null
    export let reply: () => void
</script>

<div class="flex flex-column align-items-start" style="flex:1;">
    <div class="flex align-items-center gap-2">
        <!-- NOT_IMPLEMENTED <Avatar image="/images/avatar/amyelsner.png" shape="circle" />-->
        <span class="font-bold text-900">Amy Elsner</span>
    </div>
    <div class="font-medium text-lg my-3 text-900">{summary}</div>
    <Button class="p-button-sm flex" label="Reply" severity="success" on:click={reply}></Button>
</div>

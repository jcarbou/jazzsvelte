<script lang="ts">
    import { JAZZ_SVELTE } from '$lib/components/api/JazzSvelte'

    const { themePath, ripple } = JAZZ_SVELTE
</script>

<svelte:head>
    <link rel="stylesheet" href="themes/{$themePath}/theme.css" />
    {#if $ripple}
        <style>
            .p-ripple {
                overflow: hidden;
                position: relative;
            }
        </style>
    {/if}
</svelte:head>

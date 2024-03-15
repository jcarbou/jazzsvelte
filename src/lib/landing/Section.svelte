<script lang="ts">
    export let title: string | undefined
    export let detail: string | undefined
</script>

<section class="py-8">
    {#if title}
        <div class="section-header">{title}</div>
    {/if}
    {#if title}
        <p class="section-detail">{detail}</p>
    {/if}
    <slot />
</section>

<style>
    .section-header {
        font-size: 2rem;
        color: var(--home-primary-text-color);
        font-weight: 700;
        text-align: center;
        padding: 0 2rem;
    }

    .section-detail {
        text-align: center;
        color: var(--home-secondary-text-color);
        font-weight: 500;
        font-size: 1.25rem;
        margin: 1.5rem 0 0;
        padding: 0 2rem;
    }
</style>

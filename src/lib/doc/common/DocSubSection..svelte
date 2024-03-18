<script lang="ts">
    import { page } from '$app/stores'

    export let label: string = ''
    export let id: string

    const { pathname } = $page.url
</script>

<div style="margin-bottom: 30px">
    <h3 class="doc-section-label">
        {label}
        <a href={pathname + '#' + id} target="_self">
            <a {id}>#</a>
        </a>
    </h3>
    <slot />
</div>

<style lang="scss">
    .doc-section-label {
        display: flex;
        align-items: center;
        scroll-margin-top: 6.5rem;

        :global(> a) {
            color: var(--primary-color);
            opacity: 0.7;
            margin-left: 1rem;
            display: none;
            transition: all 0.2s;
            border-radius: var(--border-radius);

            &:focus-visible {
                outline: 0 none;
                outline-offset: 0;
                box-shadow: var(--focus-ring);
            }
        }

        &:hover {
            :global(> a) {
                display: block;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
</style>

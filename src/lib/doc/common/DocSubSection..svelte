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

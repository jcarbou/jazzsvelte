<script lang="ts">
    import { page } from '$app/stores'
    import { getContext } from 'svelte'
    import type { ApiTableInfo } from './doc.types'
    import { scrollToAnchor } from './doc.utils'

    export let value: string
    export let deprecated: string | undefined = undefined

    const { id } = getContext<ApiTableInfo>('apiTabelInfo')
    const { pathname } = $page.url
</script>

<span
    id={id + '.' + value}
    class="doc-option-name"
    class:line-through={!!deprecated}
    class:cursor-pointer={!!deprecated}
    title={deprecated}
>
    {value}
    <a href={pathname + `#${id + '.' + value}`} target="_self">
        <a on:click={() => scrollToAnchor(id + '.' + val)} class="doc-option-link" role="button">
            <i class="pi pi-link"></i>
        </a>
    </a>
</span>

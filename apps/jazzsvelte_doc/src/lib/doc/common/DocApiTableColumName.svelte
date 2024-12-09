<!-- @migration-task Error while migrating Svelte code: `<a>` cannot be a child of `<a>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components. -->
<script lang="ts">
    import { page } from '$app/stores'
    import { getContext } from 'svelte'
    import type { ApiTableInfo } from './doc.types'
    import { scrollToAnchor } from './doc.utils'

    interface Props {
        value: string
        deprecated?: string | undefined
    }

    let { value, deprecated = undefined }: Props = $props()

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
        <span
            onclick={() => scrollToAnchor(id + '.' + val)}
            aria-label="scroll"
            class="doc-option-link"
            tabindex="-1"
            role="button"
        >
            <i class="pi pi-link"></i>
        </span>
    </a>
</span>

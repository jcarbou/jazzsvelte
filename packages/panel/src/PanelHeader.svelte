<script lang="ts">
    import type { PanelHeaderProps } from './panel.types'

    import { snippetValueOrNull, stringValueOrNull } from '@jazzsvelte/utils'
    import PanelToggler from './PanelToggler.svelte'

    let {
        headerAttributes,
        titleAttributes,
        iconsAttributes,
        togglerAttributes,
        resolvedTogglerIcon,
        toggle,
        toggleable,
        collapsed,
        header = null,
        icons
    }: PanelHeaderProps = $props()

    let _headerSnippet = $derived(snippetValueOrNull(header))
    let _headerString = $derived(stringValueOrNull(header))
</script>

{#if _headerSnippet || _headerString || toggleable}
    <div {...headerAttributes}>
        <span {...titleAttributes}>
            {#if _headerSnippet}
                {@render _headerSnippet({ toggle, collapsed })}
            {:else}
                {_headerString}
            {/if}
        </span>
        <div {...iconsAttributes}>
            {#if icons}
                {@render icons?.({ toggle, collapsed })}
            {/if}
            {#if toggleable}
                <PanelToggler {togglerAttributes} {toggle} {resolvedTogglerIcon} />
            {/if}
        </div>
    </div>
{/if}

<script lang="ts">
    import type { PanelHeaderProps } from './panel.types'
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
        headerSnippet = null,
        icons
    }: PanelHeaderProps = $props()
</script>

{#if headerSnippet || header || toggleable}
    <div {...headerAttributes}>
        <span {...titleAttributes}>
            {#if headerSnippet}
                {@render headerSnippet({ toggle, collapsed })}
            {:else}
                {header}
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

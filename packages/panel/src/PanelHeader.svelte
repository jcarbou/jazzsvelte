<script lang="ts">
    import type { HTMLButtonAttributes, HTMLDivAttributes, HTMLSpanAttributes, ResolvedIconPT } from '@jazzsvelte/api'
    import PanelToggler from './PanelToggler.svelte'

    export let headerAttributes: HTMLDivAttributes
    export let titleAttributes: HTMLSpanAttributes
    export let iconsAttributes: HTMLDivAttributes
    export let togglerAttributes: HTMLButtonAttributes
    export let resolvedTogglerIcon: ResolvedIconPT
    export let toggle: (event?: Event) => void
    export let toggleable: boolean
    export let collapsed: boolean
    export let header: string | null = null
</script>

{#if header || $$slots.header_content || toggleable}
    <div {...headerAttributes}>
        <span {...titleAttributes}>
            {#if $$slots.header_content}
                <slot name="header_content" {header} {toggle} {collapsed} />
            {:else}
                {header}
            {/if}
        </span>
        <div {...iconsAttributes}>
            {#if $$slots.header_icons}
                <slot name="header_icons" {toggle} {collapsed} />
            {/if}
            {#if toggleable}
                <PanelToggler {togglerAttributes} {toggle} {collapsed} {resolvedTogglerIcon} />
            {/if}
        </div>
    </div>
{/if}

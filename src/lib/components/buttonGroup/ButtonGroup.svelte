<script lang="ts">
    import { setContext } from 'svelte'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import type { CssStyle } from '../utils/cssStyles'
    import { resolvePT } from '../utils/ptUtils'
    import type { ButtonGroupPassThroughMethodOptions, ButtonGroupPassThroughOptions } from './buttonGroup.types'
    import type { ButtonGroupContext } from '../button/button.types'

    export let disabled: boolean = false
    export let rounded: boolean = false
    export let outlined: boolean = false
    export let size: 'small' | 'large' | undefined = undefined
    export let iconPos: 'top' | 'bottom' | 'left' | 'right' | undefined = undefined
    export let visible: boolean = true
    export let pt: ButtonGroupPassThroughOptions | null = null
    export let ptOptions: ButtonGroupPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null

    // "root element"
    $: rootAttributes = resolvePT(
        ['p-button-group p-component'],
        style,
        pt?.root,
        JAZZ_SVELTE.pt?.buttonGroup?.root,
        ptOptions,
        unstyled
    )
    $: {
        setContext<ButtonGroupContext>('buttonGroup', {
            disabled,
            rounded,
            outlined,
            size,
            iconPos
        })
    }
</script>

{#if visible}
    <span role="group" data-pc-name="buttongroup" data-pc-section="root" {...rootAttributes} {...$$restProps}>
        <slot />
    </span>
{/if}

<style>
    .p-button-group {
        display: flex;
    }
</style>

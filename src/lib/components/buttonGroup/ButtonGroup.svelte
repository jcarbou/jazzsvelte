<script lang="ts">
    import type { ButtonGroupPassThroughMethodOptions, ButtonGroupPassThroughOptions } from './buttonGroup.types'
    import type { ButtonGroupContext } from '../button/button.types'
    import type { HTMLSpanAttributes, CssStyle } from '../utils/utils.types'

    import { setContext } from 'svelte'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'

    export let disabled: boolean = false
    export let rounded: boolean = false
    export let outlined: boolean = false
    export let size: 'small' | 'normal' | 'large' | undefined = undefined
    export let iconPos: 'top' | 'bottom' | 'left' | 'right' | undefined = undefined
    export let visible: boolean = true
    export let pt: ButtonGroupPassThroughOptions | null = null
    export let ptOptions: ButtonGroupPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null
    let className: string | null = null
    export { className as class }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: ['p-button-group p-component', className],
            style,
            role: 'group',
            'data-pc-name': 'buttongroup',
            'data-pc-section': 'root'
        },
        pt?.root,
        JAZZ_SVELTE.pt?.buttonGroup?.root,
        ptOptions,
        unstyled
    ) satisfies HTMLSpanAttributes

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
    <span {...rootAttributes} {...$$restProps}>
        <slot />
    </span>
{/if}

<style>
    .p-button-group {
        display: flex;
    }
</style>

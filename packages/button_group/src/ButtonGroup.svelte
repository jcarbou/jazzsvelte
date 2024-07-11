<script lang="ts">
    import type { ButtonGroupPassThroughMethodOptions, ButtonGroupPassThroughOptions } from './buttonGroup.types'
    import type { ButtonGroupContext, ButtonIconPos, ButtonSeverity, ButtonSize } from '@jazzsvelte/button'
    import type { HTMLSpanAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'

    import { setContext } from 'svelte'
    import { resolvePT } from '@jazzsvelte/api'
    import { defaultButtonGroupProps as DEFAULT, globalButtonGroupPT as globalPt } from './buttonGroup.config'

    let className: string | null = DEFAULT.class
    export { className as class }
    export let disabled: boolean = DEFAULT.disabled
    export let iconPos: ButtonIconPos | null = DEFAULT.iconPos
    export let outlined: boolean = DEFAULT.outlined
    export let pt: ButtonGroupPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let rounded: boolean = DEFAULT.rounded
    export let severity: ButtonSeverity | null = DEFAULT.severity
    export let size: ButtonSize | null = DEFAULT.size
    export let style: CssStyle = DEFAULT.style
    export let unstyled: boolean = DEFAULT.unstyled
    export let visible: boolean = DEFAULT.visible

    export const displayName = 'ButtonGroup'

    $: ptContext = {
        props: { ...DEFAULT, ...$$props },
        context: { disabled },
        ptOptions,
        unstyled
    } satisfies ButtonGroupPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

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
        globalPt?.root,
        ptContext
    ) satisfies HTMLSpanAttributes

    $: {
        setContext<ButtonGroupContext>('buttonGroup', {
            disabled,
            rounded,
            outlined,
            size: size || undefined,
            iconPos: iconPos || undefined,
            severity: severity || undefined
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

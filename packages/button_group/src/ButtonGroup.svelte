<script lang="ts">
    import type { ButtonGroupPassThroughMethodOptions, ButtonGroupProps } from './buttonGroup.types'
    import type { ButtonGroupContext } from '@jazzsvelte/button'
    import type { HTMLSpanAttributes, PassThroughOptions } from '@jazzsvelte/api'

    import { setContext } from 'svelte'
    import { resolvePT } from '@jazzsvelte/api'
    import { defaultButtonGroupProps as DEFAULT, globalButtonGroupPT as globalPt } from './buttonGroup.config'

    let {
        class: className = DEFAULT.class,
        disabled = DEFAULT.disabled,
        iconPos = DEFAULT.iconPos,
        outlined = DEFAULT.outlined,
        pt = null,
        ptOptions = null,
        rounded = DEFAULT.rounded,
        severity = DEFAULT.severity,
        size = DEFAULT.size,
        style = DEFAULT.style,
        unstyled = DEFAULT.unstyled,
        visible = DEFAULT.visible,
        children,
        ..._restProps
    }: ButtonGroupProps = $props()

    let _props: ButtonGroupProps = $derived({
        className,
        disabled,
        iconPos,
        outlined,
        pt,
        ptOptions,
        rounded,
        severity,
        size,
        style,
        unstyled,
        visible
    })

    export const displayName = 'ButtonGroup'

    export function getElement(): HTMLSpanElement {
        return rootEl
    }
    // svelte-ignore non_reactive_update
    let rootEl: HTMLSpanElement

    let ptContext: ButtonGroupPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: { ...DEFAULT, ..._props },
        context: { disabled },
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes: HTMLSpanAttributes = $derived(
        resolvePT(
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
        )
    )

    $effect(() => {
        setContext<ButtonGroupContext>('buttonGroup', {
            disabled,
            rounded,
            outlined,
            size: size || undefined,
            iconPos: iconPos || undefined,
            severity: severity || undefined
        })
    })
</script>

{#if visible}
    <span bind:this={rootEl} {...rootAttributes} {..._restProps}>
        {@render children?.()}
    </span>
{/if}

<style>
    .p-button-group {
        display: flex;
    }
</style>

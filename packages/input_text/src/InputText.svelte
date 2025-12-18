<script lang="ts">
    import type { JazzSvelteContext, PassThroughOptions } from '@jazzsvelte/api'
    import type { InputTextPassThroughMethodOptions, InputTextProps } from './inputText.types'

    import { resolveInputPt } from '@jazzsvelte/api'
    import { getContext } from 'svelte'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { keyFilter } from '@jazzsvelte/key_filter_action'
    import { defaultInputTextProps as DEFAULT, globalInputTextPT as globalPt } from './inputText.config'
    import { focusEl } from '@jazzsvelte/dom'

    let {
        class: className = null,
        disabled = DEFAULT.disabled,
        fieldSize = DEFAULT.fieldSize,
        keyFilter: keyFilterType = DEFAULT.keyFilter,
        invalid = DEFAULT.invalid,
        onvalidatedinput = null,
        pt = null,
        ptOptions = null,
        style = null,
        size = DEFAULT.size,
        tooltip: tooltipContent = DEFAULT.tooltip,
        tooltipOptions = DEFAULT.tooltipOptions,
        unstyled = false,
        validateOnly = DEFAULT.validateOnly,
        value = $bindable(DEFAULT.value),
        variant = DEFAULT.variant,
        ..._restProps
    }: InputTextProps = $props()

    let _props: InputTextProps = $derived({
        class: className,
        disabled,
        fieldSize,
        keyFilter: keyFilterType,
        invalid,
        pt,
        ptOptions,
        style,
        size,
        tooltip: tooltipContent,
        tooltipOptions,
        unstyled,
        validateOnly,
        value,
        variant
    })

    export const displayName = 'InptText'
    export const focus = (scrollTo?: boolean) => {
        focusEl(rootEl, scrollTo)
    }
    export const blur = () => {
        rootEl.blur()
    }

    export function getElement(): HTMLInputElement {
        return rootEl
    }
    let rootEl: HTMLInputElement

    const jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { inputStyle } = jazzSvelteContext

    let ptContext: InputTextPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: { ...DEFAULT, ..._props },
        context: { disabled },
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveInputPt(
            {
                class: [
                    'p-inputtext p-component',
                    className,
                    {
                        'p-disabled': disabled,
                        'p-filled': !!value,
                        'p-invalid': invalid,
                        'p-variant-filled': variant ? variant === 'filled' : $inputStyle === 'filled',
                        'p-inputtext-sm': fieldSize === 'small',
                        'p-inputtext-lg': fieldSize === 'large'
                    }
                ],
                style,
                'data-pc-name': 'inputtext',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    let showOnDisabled = $derived(!!tooltipOptions?.showOnDisabled satisfies boolean)
</script>

<TooltipTargetDisabled {showOnDisabled} useTooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
    <input
        {disabled}
        {...rootAttributes}
        {..._restProps}
        size={size || undefined}
        bind:value
        bind:this={rootEl}
        {onvalidatedinput}
        use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
        use:keyFilter={{ keyFilterType, validateOnly }}
    />
</TooltipTargetDisabled>

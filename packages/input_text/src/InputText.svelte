<script lang="ts">
    import type { JazzSvelteContext, HTMLInputAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'
    import type { InputTextEvent, InputTextPassThroughMethodOptions, InputTextPassThroughOptions } from './inputText.types'
    import type { KeyFilterRegExp, ValidatedInputEvent } from '@jazzsvelte/key_filter_action'

    import { resolvePT } from '@jazzsvelte/api'
    import { createEventDispatcher, getContext } from 'svelte'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { keyFilter } from '@jazzsvelte/key_filter_action'
    import { defaultInputTextProps as DEFAULT, globalInputTextPT as globalPt } from './inputText.config'
    import { focusEl } from '../../dom/src'

    let className: string | null = null
    export { className as class }
    export let disabled: boolean = DEFAULT.disabled
    let keyFilterType: KeyFilterRegExp | null = DEFAULT.keyFilter
    export { keyFilterType as keyFilter }
    // TODO
    export let invalid: boolean = DEFAULT.invalid
    export let pt: InputTextPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle = null
    export let size: number | null = DEFAULT.size
    let tooltipContent: string | null = DEFAULT.tooltip
    export { tooltipContent as tooltip }
    export let tooltipOptions: TooltipOptions | null = DEFAULT.tooltipOptions
    export let unstyled: boolean = false
    export let validateOnly: boolean = DEFAULT.validateOnly
    export let value: string = DEFAULT.value
    // TODO
    export let variant: string | null = DEFAULT.variant

    export const displayName = 'InptText'
    export const focus = (scrollTo?: boolean) => {
        focusEl(inputEl, scrollTo)
    }
    export const blur = () => {
        inputEl.blur()
    }

    let inputEl: HTMLInputElement

    $: ptContext = {
        props: { ...DEFAULT, ...$$props },
        context: { disabled },
        ptOptions,
        unstyled
    } satisfies InputTextPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: [
                'p-inputtext p-component',
                className,
                {
                    'p-disabled': disabled,
                    'p-filled': !!value
                }
            ],
            style,
            'data-pc-name': 'inputtext',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLInputAttributes

    $: showOnDisabled = !!tooltipOptions?.showOnDisabled satisfies boolean

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')

    // Forward validatedinput event
    const dispatchValidatedInput = createEventDispatcher<InputTextEvent>()
    const onValidatedInput = (e: ValidatedInputEvent) => dispatchValidatedInput('validatedinput', e)
</script>

<TooltipTargetDisabled {showOnDisabled} useTooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
    <input
        {disabled}
        {...rootAttributes}
        {...$$restProps}
        size={size || undefined}
        bind:value
        bind:this={inputEl}
        on:paste
        on:keydown
        on:input
        on:validatedinput={onValidatedInput}
        on:beforeinput
        use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
        use:keyFilter={{ keyFilterType, validateOnly }}
    />
</TooltipTargetDisabled>

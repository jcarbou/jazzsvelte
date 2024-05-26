<script lang="ts">
    import type { JazzSvelteContext, HTMLInputAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'
    import type { InputTextEvent, InputTextPassThroughMethodOptions, InputTextPassThroughOptions } from './inputText.types'
    import type { KeyFilterRegExp, ValidatedInputEvent } from '@jazzsvelte/key_filter'

    import { resolvePT } from '@jazzsvelte/api'
    import { createEventDispatcher, getContext } from 'svelte'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { keyFilter } from '@jazzsvelte/key_filter'
    import { defaultInputTextProps as DEFAULT, globalInputTextPT as globalPt } from './inputText.config'

    export let disabled: boolean = DEFAULT.disabled
    let keyFilterType: KeyFilterRegExp | null = DEFAULT.keyFilter
    export { keyFilterType as keyFilter }
    let tooltipContent: string | null = DEFAULT.tooltip
    export { tooltipContent as tooltip }
    export let tooltipOptions: TooltipOptions | null = DEFAULT.tooltipOptions
    export let validateOnly: boolean = DEFAULT.validateOnly
    export let value: string = DEFAULT.value
    export let pt: InputTextPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let unstyled: boolean = false
    let className: string | null = null
    export { className as class }
    export let style: CssStyle = null

    // TODO
    export let invalid: boolean = DEFAULT.invalid
    export let size: string | number | null = DEFAULT.size

    export const displayName = 'InptText'

    $: ptContext = {
        props: $$props,
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
        bind:value
        on:paste
        on:keydown
        on:input
        on:validatedinput={onValidatedInput}
        on:beforeinput
        use:tooltip={{ showOnDisabled, tooltipContent, tooltipOptions, jazzSvelteContext }}
        use:keyFilter={{ keyFilterType, validateOnly }}
    />
</TooltipTargetDisabled>

<script lang="ts">
    import type { JazzSvelteContext, HTMLInputAttributes, CssStyle } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'
    import type { InputTextEvent, InputTextPassThroughMethodOptions, InputTextPassThroughOptions } from './inputtext.types'
    import type { KeyFilterRegExp, ValidatedInputEvent } from '@jazzsvelte/key_filter'

    import { JAZZ_SVELTE, resolvePT } from '@jazzsvelte/api'

    import { createEventDispatcher, getContext } from 'svelte'
    import { tooltip, TooltipTargetDisabled } from '@jazzsvelte/tooltip'
    import { keyFilter } from '@jazzsvelte/key_filter'

    export let disabled: boolean = false
    export let invalid: boolean = false
    let keyFilterType: KeyFilterRegExp | null = null
    export { keyFilterType as keyFilter }
    let tooltipContent: string | null = null
    export { tooltipContent as tooltip }
    export let tooltipOptions: TooltipOptions | undefined = undefined
    export let validateOnly: boolean = false

    export let value: string = ''
    // onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;

    export let pt: InputTextPassThroughOptions | null = null
    export let ptOptions: InputTextPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    let className: string | null = null
    export { className as class }
    export let style: CssStyle = null

    //$: defaultAriaLabel = label ? label + (badge ? ' ' + badge : '') : ''

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
        JAZZ_SVELTE.pt?.inputtext?.root,
        ptOptions,
        unstyled
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

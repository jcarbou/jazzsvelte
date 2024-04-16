<script lang="ts">
    import type { CssStyle } from '../utils/cssStyles'
    import type { HTMLInputAttributes } from '../utils/utils.types'
    import type { TooltipOptions } from '../tooltip/tooltipOptions.types'

    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'

    import { createEventDispatcher } from 'svelte'
    import { tooltip } from '../tooltip/tooltip.actions'
    import TooltipTargetDisabled from '../tooltip/TooltipTargetDisabled.svelte'
    import type { InputTextEvent, InputTextPassThroughMethodOptions, InputTextPassThroughOptions } from './inputtext.types'
    import { keyFilter } from '../keyfilter/keyFilter.actions'
    import type { KeyFilterRegExp, ValidatedInputEvent } from '../keyfilter/keyfilter.types'

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
        [
            'p-inputtext p-component',
            className,
            {
                'p-disabled': disabled,
                'p-filled': !!value
            }
        ],
        style,
        pt?.root,
        JAZZ_SVELTE.pt?.inputtext?.root,
        ptOptions,
        unstyled
    ) satisfies HTMLInputAttributes

    $: showOnDisabled = !!tooltipOptions?.showOnDisabled satisfies boolean

    // Forward validatedinput event
    const dispatchValidatedInput = createEventDispatcher<InputTextEvent>()
    const onValidatedInput = (e: ValidatedInputEvent) => dispatchValidatedInput('validatedinput', e)
</script>

<TooltipTargetDisabled {showOnDisabled} useTooltip={{ content: tooltipContent, options: tooltipOptions }}>
    <input
        data-pc-name="inputtext"
        data-pc-section="root"
        {disabled}
        {...rootAttributes}
        {...$$restProps}
        bind:value
        on:paste
        on:keydown
        on:input
        on:validatedinput={onValidatedInput}
        on:beforeinput
        use:tooltip={{ content: showOnDisabled ? null : tooltipContent, options: tooltipOptions }}
        use:keyFilter={{ keyFilterType, validateOnly }}
    />
</TooltipTargetDisabled>

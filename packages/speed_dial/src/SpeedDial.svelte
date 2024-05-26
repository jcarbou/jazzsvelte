<script lang="ts">
    import type {
        SpeedDialPassThroughMethodOptions,
        SpeedDialPassThroughOptions,
        SpeedDialDirection,
        SpeedDialType
    } from './speedDial.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        HTMLButtonPassThroughOAttributes,
        HTMLLIAttributes,
        HTMLAnchorAttributes,
        HTMLSpanAttributes,
        HTMLComponentHooksAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions
    } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'

    import { getContext } from 'svelte'
    false
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultSpeedDialProps as DEFAULT, globalSpeedDialPT as globalPt } from './speedDial.config'

    export let buttonClassName: string | null = DEFAULT.buttonClassName
    export let buttonStyle: string | CssObject | null = DEFAULT.buttonStyle
    export let buttonTemplate: typeof SvelteComponent | null = DEFAULT.buttonTemplate
    export let direction: SpeedDialDirection | null = DEFAULT.direction
    export let disabled: boolean = DEFAULT.disabled
    export let hideIcon: string | IconComponent | null = DEFAULT.hideIcon
    export let hideOnClickOutside: boolean = DEFAULT.hideOnClickOutside
    export let mask: boolean = DEFAULT.mask
    export let maskClassName: string | null = DEFAULT.maskClassName
    export let maskStyle: string | CssObject | null = DEFAULT.maskStyle
    export let model: MenuItem[] = DEFAULT.model
    export let radius: number = DEFAULT.radius
    export let rotateAnimation: boolean = DEFAULT.rotateAnimation
    export let showIcon: string | IconComponent | null = DEFAULT.showIcon
    export let transitionDelay: number = DEFAULT.transitionDelay
    export let type: SpeedDialType = DEFAULT.type
    export let unstyled: boolean = DEFAULT.unstyled
    export let visible: boolean = DEFAULT.visible
    export let pt: SpeedDialPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

    export const displayName = 'SpeedDial'

    $: ptContext = {
        props: $$props,
        context: {},
        ptOptions,
        unstyled
    } satisfies SpeedDialPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: ['p-component', className, {}],
            style,
            'data-pc-name': 'speedDial',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "button" element
    $: buttonAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'button'
        },
        pt?.button,
        globalPt?.button,
        ptContext
    ) satisfies HTMLButtonPassThroughOAttributes

    // "menu" element
    $: menuAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'menu'
        },
        pt?.menu,
        globalPt?.menu,
        ptContext
    ) satisfies HTMLDivAttributes

    // "menuitem" element
    $: menuitemAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'menuitem'
        },
        pt?.menuitem,
        globalPt?.menuitem,
        ptContext
    ) satisfies HTMLLIAttributes

    // "action" element
    $: actionAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'action'
        },
        pt?.action,
        globalPt?.action,
        ptContext
    ) satisfies HTMLAnchorAttributes

    // "mask" element
    $: maskAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'mask'
        },
        pt?.mask,
        globalPt?.mask,
        ptContext
    ) satisfies HTMLDivAttributes

    // "hooks" element
    $: hooksAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'hooks'
        },
        pt?.hooks,
        globalPt?.hooks,
        ptContext
    ) satisfies HTMLComponentHooksAttributes

    // "actionIcon" element
    $: resolvedActionIcon = resolveIconPT(
        actionIcon,
        {
            class: []
        },
        pt?.actionIcon,
        globalPt?.actionIcon,
        ptContext
    ) satisfies ResolvedIconPT

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

<div {...rootAttributes} {...$$restProps}>
    <buttonpassthrougho {...buttonAttributes}></buttonpassthrougho>
    <div {...menuAttributes}></div>
    <li {...menuitemAttributes}></li>
    <anchor {...actionAttributes}></anchor>
    <div {...maskAttributes}></div>
    <componenthooks {...hooksAttributes}></componenthooks>
    <IconBuilder resolvedIcon={resolvedActionIcon} />
</div>

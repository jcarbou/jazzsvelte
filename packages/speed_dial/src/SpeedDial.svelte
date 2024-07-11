<script lang="ts">
    import type {
        SpeedDialPassThroughMethodOptions,
        SpeedDialPassThroughOptions,
        SpeedDialDirection,
        SpeedDialType,
        SpeedDialContext
    } from './speedDial.types'

    import type {
        HTMLDivAttributes,
        IconComponent,
        CssStyle,
        PassThroughOptions,
        HTMLULAttributes,
        MenuItem,
        CssObject
    } from '@jazzsvelte/api'
    import type { TooltipGetter, TooltipOptions } from '@jazzsvelte/tooltip'
    import type { ButtonProps } from '@jazzsvelte/button'

    import { SvelteComponent, setContext } from 'svelte'

    import { mergeCssClasses, resolvePT } from '@jazzsvelte/api'
    import { Button } from '@jazzsvelte/button'
    import { defaultSpeedDialProps as DEFAULT, globalSpeedDialPT as globalPt } from './speedDial.config'
    import SpeedDialMenuItem from './SpeedDialMenuItem.svelte'
    import { uniqueId } from '@jazzsvelte/utils'
    import { findNextOptionIndex, findPrevOptionIndex } from './speedDial.utils'
    import { focusEl } from '../../dom/src'
    import { clickOutside } from '@jazzsvelte/click_outside_action'

    export let id: string | null = null
    export let buttonClass: string | null = DEFAULT.buttonClass
    export let buttonStyle: string | CssObject | null = DEFAULT.buttonStyle
    export let buttonTemplate: typeof SvelteComponent | null = DEFAULT.buttonTemplate
    export let direction: SpeedDialDirection | null = DEFAULT.direction
    export let disabled: boolean = DEFAULT.disabled
    export let hideIcon: string | IconComponent | null = DEFAULT.hideIcon
    export let hideOnClickOutside: boolean = DEFAULT.hideOnClickOutside
    export let mask: boolean = DEFAULT.mask
    export let maskClass: string | null = DEFAULT.maskClass
    export let maskStyle: string | CssObject | null = DEFAULT.maskStyle
    export let model: MenuItem[] = DEFAULT.model
    export let radius: number = DEFAULT.radius
    export let rotateAnimation: boolean = DEFAULT.rotateAnimation
    export let showIcon: string | IconComponent | null = DEFAULT.showIcon
    export let transitionDelay: number = DEFAULT.transitionDelay
    export let type: SpeedDialType = DEFAULT.type
    export let unstyled: boolean = DEFAULT.unstyled
    let visibleProp: boolean = DEFAULT.visible
    export { visibleProp as visible }
    export let getTooltip: TooltipGetter<MenuItem> = DEFAULT.getTooltip
    export let tooltipOptions: TooltipOptions | null = DEFAULT.tooltipOptions
    export let pt: SpeedDialPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }
    export let onHide: (() => void) | null = null
    export let onShow: (() => void) | null = null
    export let onClick: ((ev: Event) => void) | null = null
    export let onVisibleChange: ((visible: boolean) => void) | null = null

    export const displayName = 'SpeedDial'

    let visibleState = false
    $: visible = onVisibleChange ? visibleProp : visibleState
    let button: Button
    let menu: HTMLUListElement
    let focused = false
    let focusedOptionIndex = -1

    $: ptContext = {
        props: { ...DEFAULT, ...$$props },
        state: {
            visible
        },
        ptOptions,
        unstyled
    } satisfies SpeedDialPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    $: idState = id || (uniqueId('speedDial_') satisfies string)

    const onItemClick = (e: MouseEvent | KeyboardEvent, item: MenuItem) => {
        item.command && item.command({ originalEvent: e, item })
        hide()
        e.preventDefault()
    }

    setContext<SpeedDialContext>('speedDial', {
        getTooltip,
        tooltipOptions,
        onItemClick,
        hide
    })

    // "root element"
    $: rootAttributes = resolvePT(
        {
            id: idState,
            class: [
                'p-component',
                'p-speeddial',
                `p-speeddial-${type}`,
                className,
                {
                    [`p-speeddial-direction-${direction}`]: type !== 'circle',
                    'p-speeddial-opened': visible,
                    'p-disabled': disabled
                }
            ],
            style: [
                style,
                {
                    alignItems: direction === 'up' || direction === 'down' ? 'center' : '',
                    justifyContent: direction === 'left' || direction === 'right' ? 'center' : '',
                    flexDirection:
                        direction === 'up'
                            ? 'column-reverse'
                            : direction === 'down'
                              ? 'column'
                              : direction === 'left'
                                ? 'row-reverse'
                                : direction === 'right'
                                  ? 'row'
                                  : null
                }
            ],
            'data-pc-name': 'speedDial',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    function onClickOutSide(): void {
        if (!hideOnClickOutside || !visible) return
        hide()
    }

    // "button" element
    $: showIconVisible = ((!visible && !!showIcon) || rotateAnimation) satisfies boolean
    $: hideIconVisible = (visible && !!hideIcon) satisfies boolean
    $: buttonAttributes = {
        class: mergeCssClasses([
            buttonClass,
            'p-speeddial-button p-button-rounded',
            {
                'p-speeddial-rotate': rotateAnimation
            }
        ]),
        'data-pc-section': 'button',
        role: 'button',
        style: buttonStyle,
        icon: showIconVisible ? showIcon : hideIconVisible ? hideIcon : null,
        disabled: disabled,
        'aria-label': $$props['aria-label'],
        'aria-expanded': visible,
        'aria-haspopup': true,
        'aria-controls': idState + '_list',
        'aria-labelledby': $$props['aria-labelledby']
        // pt?:  ???
    } satisfies ButtonProps

    function _onClick(ev: MouseEvent): void {
        visible ? hide() : show()
        onClick && onClick(ev)
    }

    function hide(): void {
        onVisibleChange ? onVisibleChange(false) : (visibleState = false)
        onHide && onHide()
    }

    function show(): void {
        onVisibleChange ? onVisibleChange(true) : (visibleState = true)
        onShow && onShow()
    }

    function onTogglerArrowUp(event: KeyboardEvent): void {
        focused = true
        focusEl(menu)
        show()
        navigatePrevItem(event)
        event.preventDefault()
    }

    function onTogglerArrowDown(event: KeyboardEvent): void {
        focused = true
        focusEl(menu)
        show()
        navigateNextItem(event)
        event.preventDefault()
    }

    function onButtonKeydown(event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
                onTogglerArrowDown(event)
                break
            case 'ArrowUp':
            case 'ArrowRight':
                onTogglerArrowUp(event)
                break
            case 'Escape':
                onEscapeKey()
                break
            default:
                break
        }
    }

    // "menu" element
    $: menuAttributes = resolvePT(
        {
            class: ['p-speeddial-list'],
            'data-pc-section': 'menu',
            style: {
                flexDirection:
                    direction === 'up'
                        ? 'column-reverse'
                        : direction === 'down'
                          ? 'column'
                          : direction === 'left'
                            ? 'row-reverse'
                            : direction === 'right'
                              ? 'row'
                              : null
            },
            role: 'menu',
            tabindex: -1,
            'aria-activedescendant': focused ? focusedOptionId() : undefined
        },
        pt?.menu,
        globalPt?.menu,
        ptContext
    ) satisfies HTMLULAttributes

    function onMenuFocus(): void {
        focused = true
    }

    function onMenuBlur(): void {
        focused = false
        focusedOptionIndex = -1
    }

    function focusedOptionId(): string | null {
        return focusedOptionIndex !== -1 ? `${idState}_${focusedOptionIndex}` : null
    }

    function navigateNextItem(event: Event, index: number | null = null, defaultFocusedOptionIndex: number | null = null): void {
        const newIndex = findNextOptionIndex(index || focusedOptionIndex, model)

        if (newIndex != null) {
            focusedOptionIndex = newIndex
        } else if (defaultFocusedOptionIndex !== null) {
            focusedOptionIndex = defaultFocusedOptionIndex
        }

        event.preventDefault()
    }

    function navigatePrevItem(event: Event, index: number | null = null, defaultFocusedOptionIndex: number | null = null): void {
        const newIndex = findPrevOptionIndex(index || focusedOptionIndex, model)

        if (newIndex != null) {
            focusedOptionIndex = newIndex
        } else if (defaultFocusedOptionIndex !== null) {
            focusedOptionIndex = defaultFocusedOptionIndex
        }

        event.preventDefault()
    }

    function onEnterKey(event: KeyboardEvent): void {
        const item = model[focusedOptionIndex]

        onItemClick(event, item)
        onMenuBlur()
        button.focus()
    }

    function onEscapeKey(): void {
        hide()
        button.focus()
    }

    function onHomeKey(event: KeyboardEvent): void {
        event.preventDefault()
        navigateNextItem(event, -1, -1)
    }

    function onEndKey(event: KeyboardEvent): void {
        event.preventDefault()
        navigatePrevItem(event, -1, -1)
    }

    function onMenuKeyDown(event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowDown':
                direction === 'down' ? navigateNextItem(event) : navigatePrevItem(event)
                break
            case 'ArrowUp':
                direction === 'down' ? navigatePrevItem(event) : navigateNextItem(event)
                break

            case 'ArrowLeft':
                ;['left', 'up-right', 'down-left'].includes(direction || '') ? navigateNextItem(event) : navigatePrevItem(event)
                break

            case 'ArrowRight':
                ;['left', 'up-right', 'down-left'].includes(direction || '') ? navigatePrevItem(event) : navigateNextItem(event)
                break

            case 'Enter':
            case 'Space':
                onEnterKey(event)
                break

            case 'Escape':
                onEscapeKey()
                break

            case 'Home':
                onHomeKey(event)
                break

            case 'End':
                onEndKey(event)
                break

            default:
                break
        }
    }

    // "mask" element
    $: maskAttributes = resolvePT(
        {
            class: [
                'p-speeddial-mask',
                maskClass,
                {
                    'p-speeddial-mask-visible': visible
                }
            ],
            style: maskStyle,
            'data-pc-section': 'mask'
        },
        pt?.mask,
        globalPt?.mask,
        ptContext
    ) satisfies HTMLDivAttributes

    function getItemStyle(index: number): CssStyle {
        const transitionDelay = calculateTransitionDelay(index)
        const pointStyle = calculatePointStyle(index)

        return {
            transitionDelay: `${transitionDelay}ms`,
            ...pointStyle
        }
    }

    const calculateTransitionDelay = (index: number) => {
        const length = model.length

        return (visible ? length - index - 1 : index) * transitionDelay
    }

    function calculatePointStyle(index: number): {
        left?: string
        top?: string
        right?: string
        bottom?: string
    } {
        if (type !== 'linear') {
            const length = model.length
            radius = radius || length * 20

            if (type === 'circle') {
                const step = (2 * Math.PI) / length

                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                }
            } else if (type === 'semi-circle') {
                const step = Math.PI / (length - 1)
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`

                if (direction === 'up') {
                    return { left: x, bottom: y }
                } else if (direction === 'down') {
                    return { left: x, top: y }
                } else if (direction === 'left') {
                    return { right: y, top: x }
                } else if (direction === 'right') {
                    return { left: y, top: x }
                }
            } else if (type === 'quarter-circle') {
                const step = Math.PI / (2 * (length - 1))
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`

                if (direction === 'up-left') {
                    return { right: x, bottom: y }
                } else if (direction === 'up-right') {
                    return { left: x, bottom: y }
                } else if (direction === 'down-left') {
                    return { right: y, top: x }
                } else if (direction === 'down-right') {
                    return { left: y, top: x }
                }
            }
        }

        return {}
    }
</script>

<div {...rootAttributes} {...$$restProps} use:clickOutside on:clickoutside={onClickOutSide}>
    <Button bind:this={button} {...buttonAttributes} on:click={_onClick} on:keydown={onButtonKeydown} />
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <ul bind:this={menu} {...menuAttributes} on:focus={onMenuFocus} on:keydown={onMenuKeyDown} on:blur={onMenuBlur}>
        {#each model as item, index (index)}
            <SpeedDialMenuItem
                id={`${idState}_${index}`}
                {item}
                active={focusedOptionIndex === index}
                style={getItemStyle(index)}
                {pt}
                {ptContext}
                {unstyled}
            />
        {/each}
    </ul>
</div>
{#if mask}
    <div {...maskAttributes}></div>
{/if}

<style>
    @layer primereact {
        .p-speeddial {
            position: absolute;
            display: flex;
            z-index: 1;
        }

        .p-speeddial-list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: top 0s linear 0.2s;
            pointer-events: none;
        }

        :global(.p-speeddial-item) {
            transform: scale(0);
            opacity: 0;
            transition:
                transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                opacity 0.8s;
            will-change: transform;
        }

        :global(.p-speeddial-action) {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            text-decoration: none;
        }

        .p-speeddial-circle :global(.p-speeddial-item),
        .p-speeddial-semi-circle :global(.p-speeddial-item),
        .p-speeddial-quarter-circle :global(.p-speeddial-item) {
            position: absolute;
        }

        :global(.p-speeddial-rotate) {
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            will-change: transform;
        }

        .p-speeddial-mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .p-speeddial-mask-visible {
            pointer-events: none;
            opacity: 1;
            transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .p-speeddial-opened .p-speeddial-list {
            pointer-events: auto;
        }

        .p-speeddial-opened :global(.p-speeddial-item) {
            transform: scale(1);
            opacity: 1;
        }

        .p-speeddial-opened :global(.p-speeddial-rotate) {
            transform: rotate(45deg);
        }
    }
</style>

<script lang="ts">
    import type { SpeedDialPassThroughMethodOptions, SpeedDialContext, SpeedDialProps } from './speedDial.types'
    import type { CssStyle, PassThroughOptions, MenuItem } from '@jazzsvelte/api'
    import type { ButtonProps } from '@jazzsvelte/button'

    import { setContext } from 'svelte'
    import { mergeCssClasses, resolveDivPt, resolveUlPt } from '@jazzsvelte/api'
    import { Button } from '@jazzsvelte/button'
    import { defaultSpeedDialProps as DEFAULT, globalSpeedDialPT as globalPt } from './speedDial.config'
    import SpeedDialMenuItem from './SpeedDialMenuItem.svelte'
    import { uniqueId } from '@jazzsvelte/utils'
    import { findNextOptionIndex, findPrevOptionIndex } from './speedDial.utils'
    import { focusEl } from '@jazzsvelte/dom'
    import { clickOutside } from '@jazzsvelte/click_outside_action'

    let {
        buttonClass = DEFAULT.buttonClass,
        buttonStyle = DEFAULT.buttonStyle,
        buttonSnippet = DEFAULT.buttonSnippet,
        class: className = DEFAULT.class,
        direction = DEFAULT.direction,
        disabled = DEFAULT.disabled,
        hideIcon = DEFAULT.hideIcon,
        hideOnClickOutside = DEFAULT.hideOnClickOutside,
        mask = DEFAULT.mask,
        maskClass = DEFAULT.maskClass,
        maskStyle = DEFAULT.maskStyle,
        model = DEFAULT.model,
        pt = null,
        ptOptions = null,
        radius = $bindable(DEFAULT.radius),
        rotateAnimation = DEFAULT.rotateAnimation,
        showIcon = DEFAULT.showIcon,
        style = DEFAULT.style,
        getTooltip = DEFAULT.getTooltip,
        tooltipOptions = DEFAULT.tooltipOptions,
        transitionDelay = DEFAULT.transitionDelay,
        type = DEFAULT.type,
        unstyled = DEFAULT.unstyled,
        visible = DEFAULT.visible,
        onHide = null,
        onShow = null,
        onClick = null,
        onVisibleChange = null,
        ..._restProps
    }: SpeedDialProps = $props()

    let _props: SpeedDialProps = $derived({
        buttonClass,
        buttonStyle,
        buttonSnippet,
        class: className,
        direction,
        disabled,
        hideIcon,
        hideOnClickOutside,
        mask,
        maskClass,
        maskStyle,
        model,
        pt,
        ptOptions,
        radius,
        rotateAnimation,
        showIcon,
        style,
        getTooltip,
        tooltipOptions,
        transitionDelay,
        type,
        unstyled,
        visible,
        onHide,
        onShow,
        onClick,
        onVisibleChange
    })

    export const displayName = 'SpeedDial'

    export function getElement(): HTMLDivElement {
        return rootEl
    }

    export function getMenuElement(): HTMLUListElement {
        return menuEl
    }

    export function hide(): void {
        onVisibleChange ? onVisibleChange(false) : (visibleState = false)
        onHide && onHide()
    }

    export function show(): void {
        onVisibleChange ? onVisibleChange(true) : (visibleState = true)
        onShow && onShow()
    }

    let rootEl: HTMLDivElement
    let menuEl: HTMLUListElement
    let button: Button

    let visibleState = $state(false)
    let focused = $state(false)
    let focusedOptionIndex = $state(-1)

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

    function onClickOutSide(): void {
        if (!hideOnClickOutside || !_visible) return
        hide()
    }

    function _onClick(ev: MouseEvent): void {
        _visible ? hide() : show()
        onClick && onClick(ev)
    }

    function onTogglerArrowUp(event: KeyboardEvent): void {
        focused = true
        focusEl(menuEl)
        show()
        navigatePrevItem(event)
        event.preventDefault()
    }

    function onTogglerArrowDown(event: KeyboardEvent): void {
        focused = true
        focusEl(menuEl)
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

        return (_visible ? length - index - 1 : index) * transitionDelay
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
    let _visible = $derived(onVisibleChange ? visible : visibleState)
    let ptContext: SpeedDialPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: { ...DEFAULT, ..._props },
        state: {
            visible: _visible
        },
        ptOptions,
        unstyled
    })
    let idState = $derived(uniqueId('speedDial_'))

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                id: idState,
                class: [
                    'p-component',
                    'p-speeddial',
                    `p-speeddial-${type}`,
                    className,
                    {
                        [`p-speeddial-direction-${direction}`]: type !== 'circle',
                        'p-speeddial-opened': _visible,
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
        )
    )
    // "button" element
    let showIconVisible = $derived((!_visible && !!showIcon) || rotateAnimation)
    let hideIconVisible = $derived(_visible && !!hideIcon)
    let buttonAttributes: ButtonProps = $derived({
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
        'aria-label': _props['aria-label'],
        'aria-expanded': _visible,
        'aria-haspopup': true,
        'aria-controls': idState + '_list',
        'aria-labelledby': _props['aria-labelledby']
    })

    // "menu" element
    let menuAttributes = $derived(
        resolveUlPt(
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
        )
    )

    // "mask" element
    let maskAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-speeddial-mask',
                    maskClass,
                    {
                        'p-speeddial-mask-visible': _visible
                    }
                ],
                style: maskStyle,
                'data-pc-section': 'mask'
            },
            pt?.mask,
            globalPt?.mask,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps} use:clickOutside onclickoutside={onClickOutSide}>
    <Button bind:this={button} {...buttonAttributes} onclick={_onClick} onkeydown={onButtonKeydown} />
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <ul bind:this={menuEl} {...menuAttributes} onfocus={onMenuFocus} onkeydown={onMenuKeyDown} onblur={onMenuBlur}>
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

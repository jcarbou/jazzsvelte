<script lang="ts">
    import type { SplitButtonPassThroughMethodOptions, SplitButtonPassThroughOptions, SplitButtonSize } from './splitButton.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        HTMLSpanAttributes,
        HTMLULAttributes,
        HTMLLIAttributes,
        HTMLAnchorAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions,
        CssObject
    } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'
    import type { ButtonProps, ButtonSeverity } from '@jazzsvelte/button'

    import { Button } from '@jazzsvelte/button'
    import { getContext } from 'svelte'
    import { tooltip } from '@jazzsvelte/tooltip'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultSplitButtonProps as DEFAULT, globalSplitButtonPT as globalPt } from './splitButton.config'
    import { MenuItem } from '@jazzsvelte/api'
    import { uniqueId } from '@jazzsvelte/utils'

    export let buttonClass: string | null = DEFAULT.buttonClass
    export let buttonProps: any = DEFAULT.buttonProps
    export let disabled: boolean = DEFAULT.disabled
    export let dropdownIcon: string | IconComponent | null = DEFAULT.dropdownIcon
    export let icon: string | IconComponent | null = DEFAULT.icon
    export let label: string | null = DEFAULT.label
    export let loading: boolean = DEFAULT.loading
    export let loadingIcon: string | IconComponent | null = DEFAULT.loadingIcon
    export let menuButtonClass: string | null = DEFAULT.menuButtonClass
    export let menuButtonProps: any = DEFAULT.menuButtonProps
    export let menuIcon: string | IconComponent | null = DEFAULT.menuIcon
    export let menuClass: string | null = DEFAULT.menuClass
    export let menuStyle: string | CssObject | null = DEFAULT.menuStyle
    export let model: MenuItem[] = DEFAULT.model
    export let outlined: boolean = DEFAULT.outlined
    export let raised: boolean = DEFAULT.raised
    export let rounded: boolean = DEFAULT.rounded
    export let severity: ButtonSeverity | null = DEFAULT.severity
    export let size: SplitButtonSize | null = DEFAULT.size
    export let text: boolean = DEFAULT.text
    export let tooltipOptions: TooltipOptions | null = DEFAULT.tooltipOptions
    //export let transitionOptions: CSSTransitionProps = DEFAULT.transitionOptions
    export let unstyled: boolean = DEFAULT.unstyled
    export let visible: boolean = DEFAULT.visible
    export let pt: SplitButtonPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }
    let tooltipContent: string | null = null
    export { tooltipContent as tooltip }
    export let tabIndex: string | null = null // Dom attribute

    export const displayName = 'SplitButton'

    const menuId: string = uniqueId('splitButton_menuButton_')

    $: ptContext = {
        props: $$props,
        //context: {},
        ptOptions,
        unstyled
    } satisfies SplitButtonPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: [
                'p-component',
                'p-splitbutton',
                className,
                {
                    'p-disabled': disabled,
                    'p-button-loading-label-only': loading && !icon && label,
                    [`p-button-${severity}`]: severity,
                    'p-button-raised': raised,
                    'p-button-rounded': rounded,
                    'p-button-text': text,
                    'p-button-outlined': outlined,
                    [`p-button-${size}`]: size
                }
            ],
            style,
            'data-pc-name': 'splitButton',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "button" element
    $: buttonAttributes = resolvePT(
        {
            class: ['p-splitbutton-defaultbutton', buttonClass],
            'data-pc-section': 'button'
        },
        pt?.button,
        globalPt?.button,
        ptContext
    ) satisfies ButtonProps

    // "menuButton" element
    $: menuButtonAttributes = resolvePT(
        {
            class: ['p-splitbutton-menubutton', menuButtonClass],
            'data-pc-section': 'menuButton'
        },
        pt?.menuButton,
        globalPt?.menuButton,
        ptContext
    ) satisfies ButtonProps

    let overlayVisible: boolean = false
    let menuCmp: TieredMenu

    function hideMenu(event: Event): void {
        overlayVisible = false
        menuCmp.hide(event)
    }

    function showMenu(event: Event): void {
        overlayVisible = true
        menuCmp.show(event)
    }

    function onMenuButtonClick(event: Event): void {
        overlayVisible ? hideMenu(event) : showMenu(event)
    }

    function onMenuButtonKeyDown(event: KeyboardEvent): void {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            onMenuButtonClick(event)
            event.preventDefault()
        }
    }

    // "menu" element
    $: menuAttributes = resolvePT(
        {
            class: ['p-menu', 'p-menu-overlay', 'p-component', menuClass],
            'data-pc-section': 'menu'
        },
        pt?.menu,
        globalPt?.menu,
        ptContext
    ) satisfies HTMLDivAttributes

    // "menuList" element
    $: menuListAttributes = resolvePT(
        {
            class: ['p-menu-list p-reset'],
            'data-pc-section': 'menuList'
        },
        pt?.menuList,
        globalPt?.menuList,
        ptContext
    ) satisfies HTMLULAttributes

    // "separator" element
    $: separatorAttributes = resolvePT(
        {
            class: ['p-menu-separator'],
            'data-pc-section': 'separator'
        },
        pt?.separator,
        globalPt?.separator,
        ptContext
    ) satisfies HTMLLIAttributes

    // "menuLabel" element
    $: menuLabelAttributes = resolvePT(
        {
            class: ['p-menuitem-text'],
            'data-pc-section': 'menuLabel'
        },
        pt?.menuLabel,
        globalPt?.menuLabel,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "anchor" element
    $: anchorAttributes = resolvePT(
        {
            class: [
                'p-menuitem-link',
                {
                    'p-disabled': disabled
                }
            ],
            'data-pc-section': 'anchor'
        },
        pt?.anchor,
        globalPt?.anchor,
        ptContext
    ) satisfies HTMLAnchorAttributes

    // "menuItem" element
    $: menuItemAttributes = resolvePT(
        {
            class: ['p-menuitem'],
            'data-pc-section': 'menuItem'
        },
        pt?.menuItem,
        globalPt?.menuItem,
        ptContext
    ) satisfies HTMLLIAttributes

    // "transition" element
    /* $: transitionAttributes = resolvePT(
        {
            class: ['p-connected-overlay'],
            'data-pc-section': 'transition'
        },
        pt?.transition,
        globalPt?.transition,
        ptContext
    ) satisfies HTMLSplitButtonPassThrAttributes*/

    // "icon" element
    $: resolvedIcon = resolveIconPT(
        icon,
        {
            class: ['p-button-icon p-c']
        },
        pt?.icon,
        globalPt?.icon,
        ptContext
    ) satisfies ResolvedIconPT

    // "menuIcon" element
    $: resolvedMenuIcon = resolveIconPT(
        menuIcon,
        {
            class: ['p-menuitem-icon']
        },
        pt?.menuIcon,
        globalPt?.menuIcon,
        ptContext
    ) satisfies ResolvedIconPT

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

<div {...rootAttributes} {...$$restProps} use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}>
    <Button
        {icon}
        {loading}
        {loadingIcon}
        {severity}
        {label}
        aria-label={label}
        {raised}
        {disabled}
        {tabIndex}
        {size}
        {outlined}
        {text}
        {unstyled}
        pt={pt?.button}
        {...buttonAttributes}
        {...buttonProps}
        on:click><slot name="button" /></Button
    >
    <Button
        icon={dropdownIcon}
        on:click={onMenuButtonClick}
        {disabled}
        aria-expanded={overlayVisible}
        aria-haspopup="true"
        aria-controls={menuId}
        {...menuButtonProps}
        {size}
        {severity}
        {outlined}
        {text}
        {raised}
        pt={pt?.menuButton}
        onKeyDown={onMenuButtonKeyDown}
        {unstyled}
        {...menuButtonAttributes}
    />
    <div {...menuAttributes}></div>
    <ulist {...menuListAttributes}></ulist>
    <li {...separatorAttributes}></li>
    <span {...menuLabelAttributes}></span>
    <anchor {...anchorAttributes}></anchor>
    <li {...menuItemAttributes}></li>
    <IconBuilder {resolvedIcon} />
    <IconBuilder resolvedIcon={resolvedMenuIcon} />
</div>

<style>
    @layer primereact {
        .p-splitbutton {
            display: inline-flex;
            position: relative;
        }

        .p-splitbutton .p-splitbutton-defaultbutton,
        .p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button,
        .p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button,
        .p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button-outlined.p-button:hover {
            flex: 1 1 auto;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0 none;
        }

        .p-splitbutton-menubutton,
        .p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button,
        .p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .p-splitbutton .p-menu {
            min-width: 100%;
        }

        .p-fluid .p-splitbutton {
            display: flex;
        }
    }
</style>

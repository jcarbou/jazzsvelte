<script lang="ts">
    import type { SplitButtonPassThroughMethodOptions, SplitButtonPassThroughOptions, SplitButtonSize } from './splitButton.types'

    import type {
        JazzSvelteContext,
        HTMLDivAttributes,
        IconComponent,
        CssStyle,
        PassThroughOptions,
        CssObject,
        AppendTo,
        OnEvent
    } from '@jazzsvelte/api'
    import type { TooltipOptions } from '@jazzsvelte/tooltip'
    import type { ButtonSeverity } from '@jazzsvelte/button'
    import type { MenuItem } from '@jazzsvelte/api'

    import { Button } from '@jazzsvelte/button'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import { getContext } from 'svelte'
    import { tooltip } from '@jazzsvelte/tooltip'
    import { mergeCssClasses, resolvePT } from '@jazzsvelte/api'
    import { defaultSplitButtonProps as DEFAULT, globalSplitButtonPT as globalPt } from './splitButton.config'
    import { uniqueId } from '@jazzsvelte/utils'

    export let appendTo: AppendTo = DEFAULT.appendTo
    export let autoZIndex: boolean = DEFAULT.autoZIndex
    export let baseZIndex: number = DEFAULT.baseZIndex
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

    export let onClick: OnEvent = null
    export let onMenuHide: OnEvent = null
    export let onMenuShow: OnEvent = null
    export let onMenuClick: OnEvent = null

    export const displayName = 'SplitButton'
    export const show = () => {
        visible = true
    }
    export const hide = () => {
        visible = true
    }
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement
    const menuId: string = uniqueId('splitButton_menuButton_')

    $: ptContext = {
        props: { ...DEFAULT, ...$$props },
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

    $: defaultButtonClass = mergeCssClasses(['p-splitbutton-defaultbutton', buttonClass]) || null
    $: menuButtonClass = mergeCssClasses(['p-splitbutton-menubutton', menuButtonClass]) || null

    let menuVisible: boolean = false
    let menuCmp: TieredMenu

    function _onMenuHide(event: Event): void {
        menuVisible = false
        onMenuHide && onMenuHide(event)
    }

    function _onMenuShow(event: Event): void {
        menuVisible = true
        onMenuShow && onMenuShow(event)
    }

    function _onClick(event: Event): void {
        onClick && onClick(event)
    }

    function onMenuButtonClick(event: Event): void {
        menuVisible ? menuCmp.hide(event) : menuCmp.show(event)
    }

    function onMenuButtonKeyDown(event: KeyboardEvent): void {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            onMenuButtonClick(event)
            event.preventDefault()
        }
    }

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

{#if visible}
    <div
        bind:this={rootEl}
        {...rootAttributes}
        {...$$restProps}
        use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}
    >
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
            class={defaultButtonClass}
            data-pc-section="button"
            pt={pt?.button}
            {...buttonProps}
            on:click={_onClick}
        >
            <slot name="buttonLabel" slot="label" />
        </Button>
        <Button
            icon={dropdownIcon}
            on:click={onMenuButtonClick}
            {disabled}
            aria-expanded={menuVisible}
            aria-haspopup="true"
            aria-controls={menuId}
            {...menuButtonProps}
            {size}
            {severity}
            {outlined}
            {text}
            {raised}
            {unstyled}
            class={menuButtonClass}
            data-pc-section="menuButton"
            pt={pt?.menuButton}
            onKeyDown={onMenuButtonKeyDown}
        />
        <TieredMenu
            bind:this={menuCmp}
            popup={true}
            {unstyled}
            {model}
            {appendTo}
            id={menuId}
            style={menuStyle}
            class={menuClass}
            {autoZIndex}
            {baseZIndex}
            onClick={onMenuClick}
            onShow={_onMenuShow}
            onHide={_onMenuHide}
            pt={pt?.menu}
            data-pc-section="menu"
        />
    </div>
{/if}

<style>
    @layer primereact {
        .p-splitbutton {
            display: inline-flex;
            position: relative;
        }

        .p-splitbutton :global(.p-splitbutton-defaultbutton),
        .p-splitbutton.p-button-rounded > :global(.p-splitbutton-defaultbutton.p-button),
        .p-splitbutton.p-button-outlined > :global(.p-splitbutton-defaultbutton.p-button),
        .p-splitbutton.p-button-outlined > :global(.p-splitbutton-defaultbutton.p-button-outlined.p-button:hover) {
            flex: 1 1 auto;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0 none;
        }

        .p-splitbutton-menubutton,
        .p-splitbutton.p-button-rounded > :global(.p-splitbutton-menubutton.p-button),
        .p-splitbutton.p-button-outlined > :global(.p-splitbutton-menubutton.p-button) {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .p-splitbutton :global(.p-menu) {
            min-width: 100%;
        }

        .p-fluid .p-splitbutton {
            display: flex;
        }
    }
</style>

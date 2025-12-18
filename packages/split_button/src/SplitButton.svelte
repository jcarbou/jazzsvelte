<script lang="ts">
    import type { SplitButtonPtContext, SplitButtonProps } from './splitButton.types'
    import type { JazzSvelteContext } from '@jazzsvelte/api'
    import { Button } from '@jazzsvelte/button'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import { getContext } from 'svelte'
    import { tooltip } from '@jazzsvelte/tooltip'
    import { mergeCssClasses, resolveDivPt } from '@jazzsvelte/api'
    import { defaultSplitButtonProps as DEFAULT, globalSplitButtonPT as globalPt } from './splitButton.config'
    import { uniqueId } from '@jazzsvelte/utils'

    let {
        children,
        appendTo = DEFAULT.appendTo,
        autoZIndex = DEFAULT.autoZIndex,
        baseZIndex = DEFAULT.baseZIndex,
        buttonClass = DEFAULT.buttonClass,
        buttonProps = DEFAULT.buttonProps,
        class: className = DEFAULT.class,
        disabled = DEFAULT.disabled,
        dropdownIcon = DEFAULT.dropdownIcon,
        icon = DEFAULT.icon,
        label = DEFAULT.label,
        labelSnippet = null,
        loading = DEFAULT.loading,
        loadingIcon = DEFAULT.loadingIcon,
        menuButtonClass = DEFAULT.menuButtonClass,
        menuButtonProps = DEFAULT.menuButtonProps,
        menuClass = DEFAULT.menuClass,
        menuStyle = DEFAULT.menuStyle,
        model = DEFAULT.model,
        outlined = DEFAULT.outlined,
        raised = DEFAULT.raised,
        rounded = DEFAULT.rounded,
        severity = DEFAULT.severity,
        size = DEFAULT.size,
        text = DEFAULT.text,
        tooltipOptions = DEFAULT.tooltipOptions,
        unstyled = DEFAULT.unstyled,
        visible = DEFAULT.visible,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        tooltip: tooltipContent = null,
        tabindex = null, // Dom attribute,
        onButtonClick = null,
        onMenuHide = null,
        onMenuShow = null,
        onMenuClick = null,
        ..._restProps
    }: SplitButtonProps = $props()

    let _props: SplitButtonProps = $derived({
        children,
        appendTo,
        autoZIndex,
        baseZIndex,
        buttonClass,
        buttonProps,
        class: className,
        disabled,
        dropdownIcon,
        icon,
        label,
        labelSnippet,
        loading,
        loadingIcon,
        menuButtonClass,
        menuButtonProps,
        menuClass,
        menuStyle,
        model,
        outlined,
        raised,
        rounded,
        severity,
        size,
        text,
        tooltipOptions,
        unstyled,
        visible,
        pt,
        ptOptions,
        style,
        tooltip: tooltipContent,
        tabindex,
        onButtonClick,
        onMenuHide,
        onMenuShow,
        onMenuClick
    })

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

    let ptContext: SplitButtonPtContext = {
        props: { ...DEFAULT, ..._props, ..._restProps },
        //context: {},
        // state: {},
        ptOptions,
        unstyled
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    'p-splitbutton',
                    className,
                    {
                        'p-disabled': disabled,
                        'p-button-loading-label-only': loading && !icon && (label || labelSnippet),
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
        )
    )

    let defaultButtonClass = $derived(mergeCssClasses(['p-splitbutton-defaultbutton', buttonClass]) || null)
    let _menuButtonClass = $derived(mergeCssClasses(['p-splitbutton-menubutton', menuButtonClass]) || null)

    let menuVisible: boolean = $state(false)
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
        onButtonClick && onButtonClick(event)
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
        {..._restProps}
        use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}
    >
        <Button
            {icon}
            {loading}
            {loadingIcon}
            {severity}
            {label}
            {labelSnippet}
            aria-label={label || undefined}
            {raised}
            {disabled}
            {tabindex}
            {size}
            {outlined}
            {text}
            {unstyled}
            class={defaultButtonClass}
            data-pc-section="button"
            parentPtContext={ptContext}
            pt={pt?.button || globalPt?.button}
            {...buttonProps}
            onclick={_onClick}
        >
            {#if children}
                {@render children()}
            {/if}
        </Button>
        <Button
            icon={dropdownIcon}
            onclick={onMenuButtonClick}
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
            class={_menuButtonClass}
            data-pc-section="menuButton"
            parentPtContext={ptContext}
            pt={pt?.menuButton || globalPt?.menuButton}
            onkeydown={onMenuButtonKeyDown}
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
            onclick={onMenuClick}
            onShow={_onMenuShow}
            onHide={_onMenuHide}
            parentPtContext={ptContext}
            pt={pt?.menu || globalPt?.menu}
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

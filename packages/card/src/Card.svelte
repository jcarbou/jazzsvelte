<script lang="ts">
    import type { CardProps, CardPtContext } from './card.types'
    import { resolveDivPt } from '@jazzsvelte/api'
    import { defaultCardProps as DEFAULT, globalCardPT as globalPt } from './card.config'

    let {
        children,
        footerSnippet = null,
        headerSnippet = null,
        subTitle = DEFAULT.subTitle,
        subTitleSnippet = null,
        title = DEFAULT.title,
        titleSnippet = null,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: CardProps = $props()

    let _props: CardProps = $derived({
        footerSnippet,
        headerSnippet,
        pt,
        ptOptions,
        style,
        subTitle,
        subTitleSnippet,
        title,
        titleSnippet,
        unstyled,
        class: className
    })

    export const displayName = 'Card'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let ptContext: CardPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-component', className, 'p-card p-component'],
                style,
                'data-pc-name': 'card',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "header" element
    let headerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-header'],
                'data-pc-section': 'header'
            },
            pt?.header,
            globalPt?.header,
            ptContext
        )
    )

    // "body" element
    let bodyAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-body'],
                'data-pc-section': 'body'
            },
            pt?.body,
            globalPt?.body,
            ptContext
        )
    )

    // "title" element
    let titleAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-title'],
                'data-pc-section': 'title'
            },
            pt?.title,
            globalPt?.title,
            ptContext
        )
    )

    // "subTitle" element
    let subTitleAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-subtitle'],
                'data-pc-section': 'subTitle'
            },
            pt?.subTitle,
            globalPt?.subTitle,
            ptContext
        )
    )

    // "content" element
    let contentAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-content'],
                'data-pc-section': 'content'
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "footer" element
    let footerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-card-footer'],
                'data-pc-section': 'footer'
            },
            pt?.footer,
            globalPt?.footer,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if headerSnippet}
        <div {...headerAttributes}>{@render headerSnippet({ attributes: headerAttributes, props: _props })}</div>
    {/if}
    <div {...bodyAttributes}>
        {#if titleSnippet}
            <div {...titleAttributes}>{@render titleSnippet({ attributes: titleAttributes, props: _props })}</div>
        {:else if title}
            <div {...titleAttributes}>{title}</div>
        {/if}
        {#if subTitleSnippet}
            <div {...subTitleAttributes}>{@render subTitleSnippet({ attributes: subTitleAttributes, props: _props })}</div>
        {:else if subTitle}
            <div {...subTitleAttributes}>{subTitle}</div>
        {/if}
        {#if children}
            <div {...contentAttributes}>{@render children()}</div>
        {/if}
        {#if footerSnippet}
            <div {...footerAttributes}>{@render footerSnippet({ attributes: footerAttributes, props: _props })}</div>
        {/if}
    </div>
</div>

<style>
    @layer primereact {
        .p-card-header :global(img) {
            width: 100%;
        }
    }
</style>

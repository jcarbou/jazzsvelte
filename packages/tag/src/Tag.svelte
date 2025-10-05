<script lang="ts">
    import type { TagProps, TagPtContext } from './tag.types'
    import { resolveIconPT, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultTagProps as DEFAULT, globalTagPT as globalPt } from './tag.config'

    let {
        children,
        icon = DEFAULT.icon,
        rounded = DEFAULT.rounded,
        severity = DEFAULT.severity,
        unstyled = DEFAULT.unstyled,
        valueSnippet = DEFAULT.valueSnippet,
        value = DEFAULT.value,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: TagProps = $props()

    let _props: TagProps = $derived({
        icon,
        pt,
        ptOptions,
        rounded,
        severity,
        style,
        unstyled,
        valueSnippet,
        class: className
    })

    export const displayName = 'Tag'
    export function getElement(): HTMLSpanElement {
        return rootEl
    }

    let rootEl: HTMLSpanElement

    let ptContext: TagPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveSpanPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-tag p-component',
                    {
                        [`p-tag-${severity}`]: severity !== null,
                        'p-tag-rounded': rounded
                    }
                ],
                style,
                'data-pc-name': 'tag',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "value" element
    let valueAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-tag-value'],
                'data-pc-section': 'value'
            },
            pt?.value,
            globalPt?.value,
            ptContext
        )
    )

    // "icon" element
    let resolvedIcon = $derived(
        resolveIconPT(
            icon,
            {
                class: ['p-tag-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )
</script>

<span bind:this={rootEl} {...rootAttributes} {..._restProps}>
    <IconBuilder {resolvedIcon} />
    <span {...valueAttributes}>
        {#if valueSnippet}
            {@render valueSnippet({ props: _props })}
        {:else}
            {value}
        {/if}
    </span>
    <span>
        {#if children}
            {@render children()}
        {/if}
    </span>
</span>

<style>
    @layer primereact {
        .p-tag {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .p-tag-icon,
        .p-tag-value,
        .p-tag-icon.pi {
            line-height: 1.5;
        }

        .p-tag.p-tag-rounded {
            border-radius: 10rem;
        }
    }
</style>

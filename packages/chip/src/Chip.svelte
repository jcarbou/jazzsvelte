<script lang="ts">
    import type { ChipProps, ChipPtContext } from './chip.types'
    import { resolveIconPT, resolveDivPt, resolveImagePt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultChipProps as DEFAULT, globalChipPT as globalPt } from './chip.config'

    let {
        contentSnippet = null,
        icon = DEFAULT.icon,
        image = DEFAULT.image,
        imageAlt = DEFAULT.imageAlt,
        label = DEFAULT.label,
        onImageError = null,
        onRemove = null,
        removable = DEFAULT.removable,
        removeIcon = DEFAULT.removeIcon,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: ChipProps = $props()

    let _props: ChipProps = $derived({
        contentSnippet,
        icon,
        image,
        imageAlt,
        label,
        onImageError,
        onRemove,
        pt,
        ptOptions,
        removable,
        removeIcon,
        style,
        unstyled,
        class: className
    })

    export const displayName = 'Chip'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let visible = $state(true)

    let ptContext: ChipPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        state: {
            visible
        },
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    className,
                    'p-chip p-component',
                    {
                        'p-chip-image': image != null
                    }
                ],
                style,
                'data-pc-name': 'chip',
                'data-pc-section': 'root',
                'aria-label': label
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "image" element
    let imageAttributes = $derived(
        resolveImagePt(
            {
                class: [],
                'data-pc-section': 'image',
                ///alt: imageAlt,
                //src: image,
                onerror: onImageError
            },
            pt?.image,
            globalPt?.image,
            ptContext
        )
    )

    // "label" element
    let labelAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-chip-text'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "icon" element
    let resolvedIcon = $derived(
        resolveIconPT(
            icon,
            {
                class: ['p-chip-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )

    // "removeIcon" element
    let resolvedRemoveIcon = $derived(
        resolveIconPT(
            removeIcon,
            {
                class: ['p-chip-remove-icon'],
                role: 'button',
                tabindex: 0,
                onclick: close,
                onkeydown
            },
            pt?.removeIcon,
            globalPt?.removeIcon,
            ptContext
        )
    )

    function onkeydown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Backspace') {
            close(event)
        }
    }

    function close(event: Event) {
        visible = false

        if (onRemove) {
            onRemove({
                originalEvent: event,
                value: label || image || ''
            })
        }
    }
</script>

{#if visible}
    <div bind:this={rootEl} {...rootAttributes} {..._restProps}>
        {#if contentSnippet}
            {@render contentSnippet({ props: _props })}
        {:else}
            {#if image}
                <img src={image} alt={imageAlt} {...imageAttributes} />
            {:else if icon}
                <IconBuilder {resolvedIcon} />
            {/if}
            {#if label}
                <span {...labelAttributes}>{label}</span>
            {/if}
            {#if removable}
                <IconBuilder resolvedIcon={resolvedRemoveIcon} />
            {/if}
        {/if}
    </div>
{/if}

<style>
    @layer primereact {
        .p-chip {
            display: inline-flex;
            align-items: center;
        }

        .p-chip-text {
            line-height: 1.5;
        }

        .p-chip-icon.pi {
            line-height: 1.5;
        }

        .p-chip .p-chip-remove-icon {
            line-height: 1.5;
            cursor: pointer;
        }

        .p-chip img {
            border-radius: 50%;
        }
    }
</style>

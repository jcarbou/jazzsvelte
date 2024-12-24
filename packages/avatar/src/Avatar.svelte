<script lang="ts">
    import type { AvatarPassThroughMethodOptions, AvatarProps } from './avatar.types'
    import type { PassThroughOptions } from '@jazzsvelte/api'

    import { isAttributeEquals } from '@jazzsvelte/dom'
    import { resolveDivPt, resolveIconPT, resolveImagePt, resolveSpanPt } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultAvatarProps as DEFAULT, globalAvatarPT as globalPt } from './avatar.config'

    let {
        icon = DEFAULT.icon,
        image = DEFAULT.image,
        imageAlt = DEFAULT.imageAlt,
        imageFallback = DEFAULT.imageFallback,
        label = DEFAULT.label,
        onImageError = null,
        shape = DEFAULT.shape,
        size = DEFAULT.size,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        class: className = DEFAULT.class,
        content,
        children,
        ..._restProps
    }: AvatarProps = $props()

    let _props: AvatarProps = $derived({
        icon,
        image,
        imageAlt,
        imageFallback,
        label,
        onImageError,
        shape,
        size,
        unstyled,
        pt,
        ptOptions,
        style,
        class: className,
        content,
        children
    })

    export const displayName = 'Avatar'
    export function getElement(): HTMLDivElement | null {
        return rootEl
    }

    // svelte-ignore non_reactive_update
    let rootEl: HTMLDivElement | null = null
    // svelte-ignore non_reactive_update
    let imageEl: HTMLImageElement
    let imageFailed: boolean = $state(false)

    let nested: boolean = $derived(rootEl ? isAttributeEquals(rootEl.parentElement, 'data-pc-name', 'avatargroup') : false)

    let ptContext: AvatarPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: _props,
        state: {
            imageFailed,
            isNestedInAvatarGroup: nested
        },
        ptOptions,
        unstyled
    })

    function _onImageError(event: Event): void {
        //EventHandler<Event, Element>
        if (imageFallback === 'default') {
            if (!onImageError) {
                // fallback to label or icon
                imageFailed = true
                imageEl.src = ''
            }
        } else {
            // try fallback as an image
            imageEl.src = imageFallback || ''
        }

        onImageError?.(event) // OnImageError
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-avatar',
                    'p-component',
                    className,
                    {
                        'p-avatar-image': image && !imageFailed,
                        'p-avatar-circle': shape === 'circle',
                        'p-avatar-lg': size === 'large',
                        'p-avatar-xl': size === 'xlarge',
                        'p-avatar-clickable': !!_restProps.onclick
                    }
                ],
                style,
                'data-pc-name': 'avatar',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "label" element
    let labelAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-avatar-text'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "image" element
    let imageAttributes = $derived(
        resolveImagePt(
            {
                class: [],
                'data-pc-section': 'image'
            },
            pt?.image,
            globalPt?.image,
            ptContext
        )
    )

    // "icon" element
    let resolvedIcon = $derived(
        resolveIconPT(
            icon,
            {
                class: ['p-avatar-icon']
            },
            pt?.icon,
            globalPt?.icon,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if content}
        {@render content?.({ imageAttributes, labelAttributes, resolvedIcon })}
    {:else if image && !imageFailed}
        <img bind:this={imageEl} alt={imageAlt} src={image} {...imageAttributes} onerror={_onImageError} />
    {:else if label}
        <span {...labelAttributes}>{label}</span>
    {:else if icon}
        <IconBuilder {resolvedIcon} />
    {/if}
    {@render children?.()}
</div>

<style>
    @layer primereact {
        :global(.p-avatar) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
        }

        :global(.p-avatar.p-avatar-image) {
            background-color: transparent;
        }

        :global(.p-avatar.p-avatar-circle) {
            border-radius: 50%;
        }

        :global(.p-avatar.p-avatar-circle) img {
            border-radius: 50%;
        }

        :global(.p-avatar) .p-avatar-icon {
            font-size: 1rem;
        }

        :global(.p-avatar) img {
            width: 100%;
            height: 100%;
        }

        :global(.p-avatar-clickable) {
            cursor: pointer;
        }
    }
</style>

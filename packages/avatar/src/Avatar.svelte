<script lang="ts">
    import type { AvatarPassThroughMethodOptions, AvatarPassThroughOptions, AvatarShape, AvatarSize } from './avatar.types'

    import type {
        HTMLDivAttributes,
        HTMLSpanAttributes,
        HTMLImageAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions,
        OnEvent,
        OnImageError
    } from '@jazzsvelte/api'
    import { isAttributeEquals } from '@jazzsvelte/dom'
    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { IconBuilder } from '@jazzsvelte/icons'
    import { defaultAvatarProps as DEFAULT, globalAvatarPT as globalPt } from './avatar.config'

    export let icon: string | IconComponent | null = DEFAULT.icon
    export let image: string | null = DEFAULT.image
    export let imageAlt: string | null = DEFAULT.imageAlt
    export let imageFallback: string | null = DEFAULT.imageFallback
    export let label: string | null = DEFAULT.label
    export let onClick: OnEvent = null
    export let onImageError: OnImageError = null
    export let shape: AvatarShape = DEFAULT.shape
    export let size: AvatarSize = DEFAULT.size
    export let unstyled: boolean = DEFAULT.unstyled
    export let pt: AvatarPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

    export const displayName = 'Avatar'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement
    let imageEl: HTMLImageAttributes
    let imageFailed: boolean = false

    $: nested = isAttributeEquals(rootEl?.parentElement, 'data-pc-name', 'avatargroup') satisfies boolean

    $: ptContext = {
        props: $$props,
        state: {
            imageFailed,
            isNestedInAvatarGroup: nested
        },
        ptOptions,
        unstyled
    } satisfies AvatarPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    function _onImageError(event: UIEvent): void {
        if (imageFallback === 'default') {
            if (!onImageError) {
                // fallback to label or icon
                imageFailed = true
                imageEl.src = null
            }
        } else {
            // try fallback as an image
            imageEl.src = imageFallback
        }

        onImageError?.(event)
    }

    // "root element"
    $: rootAttributes = resolvePT(
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
                    'p-avatar-clickable': !!onClick
                }
            ],
            style,
            'data-pc-name': 'avatar',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "label" element
    $: labelAttributes = resolvePT(
        {
            class: ['p-avatar-text'],
            'data-pc-section': 'label'
        },
        pt?.label,
        globalPt?.label,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "image" element
    $: imageAttributes = resolvePT(
        {
            class: [],
            'data-pc-section': 'image'
        },
        pt?.image,
        globalPt?.image,
        ptContext
    ) satisfies HTMLImageAttributes

    // "icon" element
    $: resolvedIcon = resolveIconPT(
        icon,
        {
            class: ['p-avatar-icon']
        },
        pt?.icon,
        globalPt?.icon,
        ptContext
    ) satisfies ResolvedIconPT
</script>

<div bind:this={rootEl} {...rootAttributes} {...$$restProps}>
    {#if $$slots.content}
        <slot name="content" {imageAttributes} {labelAttributes} {resolvedIcon} />
    {:else if image && !imageFailed}
        <img bind:this={imageEl} alt={imageAlt} src={image} {...imageAttributes} on:error={_onImageError} />
    {:else if label}
        <span {...labelAttributes}>{label}</span>
    {:else if icon}
        <IconBuilder {resolvedIcon} />
    {/if}
    <slot />
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

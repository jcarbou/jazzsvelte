<script lang="ts">
    import type { AvatarGroupPassThroughMethodOptions, AvatarGroupPassThroughOptions } from './avatarGroup.types'
    import type { HTMLDivAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'
    import { resolvePT } from '@jazzsvelte/api'
    import { defaultAvatarGroupProps as DEFAULT, globalAvatarGroupPT as globalPt } from './avatarGroup.config'

    export let unstyled: boolean = DEFAULT.unstyled
    export let pt: AvatarGroupPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

    export function getElement(): HTMLDivElement {
        return rootEl
    }
    export const displayName = 'AvatarGroup'

    let rootEl: HTMLDivElement

    $: ptContext = {
        props: $$props,
        ptOptions,
        unstyled
    } satisfies AvatarGroupPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: ['p-avatar-group', 'p-component', className, {}],
            style,
            'data-pc-name': 'avatarGroup',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes
</script>

<div bind:this={rootEl} {...rootAttributes} {...$$restProps}>
    <slot />
</div>

<style>
    @layer primereact {
        :global(.p-avatar-group) :global(.p-avatar) + :global(.p-avatar) {
            margin-left: -1rem;
        }

        :global(.p-avatar-group) {
            display: flex;
            align-items: center;
        }
    }
</style>

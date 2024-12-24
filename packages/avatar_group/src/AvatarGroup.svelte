<script lang="ts">
    import type { AvatarGroupPassThroughMethodOptions, AvatarGroupProps } from './avatarGroup.types'
    import type { PassThroughOptions } from '@jazzsvelte/api'

    import { resolveDivPt } from '@jazzsvelte/api'
    import { defaultAvatarGroupProps as DEFAULT, globalAvatarGroupPT as globalPt } from './avatarGroup.config'

    let {
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        class: className = DEFAULT.class,
        children,
        ..._restProps
    }: AvatarGroupProps = $props()

    let _props: AvatarGroupProps = $derived({
        unstyled,
        pt,
        ptOptions,
        style,
        className
    })

    export function getElement(): HTMLDivElement {
        return rootEl
    }
    export const displayName = 'AvatarGroup'

    let rootEl: HTMLDivElement

    let ptContext: AvatarGroupPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: _props,
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-avatar-group', 'p-component', className, {}],
                style,
                'data-pc-name': 'avatarGroup',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {@render children?.()}
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

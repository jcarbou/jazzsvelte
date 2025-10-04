<script lang="ts">
    import type { SkeletonProps, SkeletonPtContext } from './skeleton.types'
    import { resolveDivPt } from '@jazzsvelte/api'

    import { defaultSkeletonProps as DEFAULT, globalSkeletonPT as globalPt } from './skeleton.config'

    let {
        children,
        animation = DEFAULT.animation,
        borderRadius = DEFAULT.borderRadius,
        height = DEFAULT.height,
        shape = DEFAULT.shape,
        size = DEFAULT.size,
        unstyled = DEFAULT.unstyled,
        width = DEFAULT.width,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,

        ..._restProps
    }: SkeletonProps = $props()

    let _props: SkeletonProps = $derived({
        animation,
        borderRadius,
        height,
        pt,
        ptOptions,
        shape,
        size,
        style,
        unstyled,
        width,
        class: className
    })

    export const displayName = 'Skeleton'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let ptContext: SkeletonPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })
    let sizeStyle = $derived(size ? { width: size, height: size, borderRadius: borderRadius } : { width, height, borderRadius })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    'p-skeleton',
                    className,
                    {
                        'p-skeleton-circle': shape === 'circle',
                        'p-skeleton-none': animation === 'none'
                    }
                ],
                style: [style, { position: 'relative' }, sizeStyle],
                'data-pc-name': 'skeleton',
                'data-pc-section': 'root',
                'aria-hidden': true
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}></div>

<style>
    @layer primereact {
        .p-skeleton {
            position: relative;
            overflow: hidden;
        }

        .p-skeleton::after {
            content: '';
            animation: p-skeleton-animation 1.2s infinite;
            height: 100%;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(-100%);
            z-index: 1;
        }

        .p-skeleton-circle {
            border-radius: 50%;
        }

        .p-skeleton-none::after {
            animation: none;
        }
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }
</style>

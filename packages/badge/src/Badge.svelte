<script lang="ts">
    import type { CssStyle, HTMLSpanAttributes, PassThroughOptions } from '@jazzsvelte/api'
    import type {
        BadgePassThroughMethodOptions,
        BadgePassThroughOptions,
        BadgeSeverity,
        BadgeSize,
        BadgeValue
    } from './badge.types'

    import { resolvePT } from '@jazzsvelte/api'
    import { isEmpty, isNotEmpty } from '@jazzsvelte/object'
    import { defaultBadgeProps as DEFAULT, globalBadgePT as globalPt } from './badge.config'

    export let value: BadgeValue = DEFAULT.value
    export let severity: BadgeSeverity | null = DEFAULT.severity
    export let size: BadgeSize | null = DEFAULT.size
    export let pt: BadgePassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let unstyled: boolean = DEFAULT.unstyled
    export let style: CssStyle = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }
    export const displayName = 'Badge'

    $: ptContext = {
        props: $$props,
        ptOptions,
        unstyled
    } satisfies BadgePassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
        {
            class: [
                'p-badge p-component',
                className,
                {
                    'p-badge-no-gutter': isNotEmpty(value) && String(value).length === 1,
                    'p-badge-dot': isEmpty(value),
                    'p-badge-m': size === 'medium',
                    'p-badge-lg': size === 'large',
                    'p-badge-xl': size === 'xlarge',
                    [`p-badge-${severity}`]: severity !== null
                }
            ],
            style,
            'data-pc-name': 'badge',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLSpanAttributes
</script>

<span {...rootAttributes} {...$$restProps}>{value}</span>

<svelte:head>
    <style type="text/css">
        .p-overlay-badge {
            position: relative;
        }

        .p-overlay-badge .p-badge {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            transform-origin: 100% 0;
            margin: 0;
        }
    </style>
</svelte:head>

<style>
    @layer primereact {
        .p-badge {
            display: inline-block;
            border-radius: 10px;
            text-align: center;
            padding: 0 0.5rem;
        }

        .p-badge.p-badge-m {
            font-size: 0.725rem;
            min-width: 1.55rem;
            height: 1.55rem;
            line-height: 1.55rem;
        }

        .p-badge-dot {
            width: 0.5rem;
            min-width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            padding: 0;
        }

        .p-badge-no-gutter {
            padding: 0;
            border-radius: 50%;
        }
    }
</style>

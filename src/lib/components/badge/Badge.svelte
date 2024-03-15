<script lang="ts">
    import { isObject } from 'chart.js/helpers'
    import { isEmpty, isFunction, isNotEmpty, classNames } from '../utils/Utils'
    import type { ClassNameEntry, PassThroughOptions } from '../utils/utils.types'
    import type { BadgePassThroughMethodOptions, BadgePassThroughOptions, BadgeProps, BadgeSeverity, BadgeSize, BadgeValue } from './badge.types'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { ptToAttributes } from '../utils/ptUtils'
    import type { HTMLAttributes } from 'svelte/elements'

    export let value: BadgeValue
    export let severity: BadgeSeverity
    export let size: BadgeSize
    export let pt: BadgePassThroughOptions
    export let ptOptions: BadgePassThroughMethodOptions
    export let unstyled: boolean

    let rootClassName: string = ''
    let rootAttributes: BadgePassThroughOptions['root'] = {}

    $: {
        const ptGlobalAttributes = ptToAttributes(JAZZ_SVELTE.pt?.badge?.root, ptOptions)
        const ptComponentAttributes = ptToAttributes(pt?.root, ptOptions)

        const rootClasses: ClassNameEntry[] = [
            'p-badge p-component',
            {
                'p-badge-no-gutter': isNotEmpty(value) && String(value).length === 1,
                'p-badge-dot': isEmpty(value),
                'p-badge-lg': size === 'large',
                'p-badge-xl': size === 'xlarge',
                [`p-badge-${severity}`]: severity !== null
            },
            ptGlobalAttributes.classes,
            ptComponentAttributes.classes
        ]
        rootClassName = classNames(rootClasses) || ''
    }
</script>

<span class={rootClassName} {...rootAttributes}>{value}</span>

<style>
    @layer primereact {
        .p-badge {
            display: inline-block;
            border-radius: 10px;
            text-align: center;
            padding: 0 0.5rem;
        }

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

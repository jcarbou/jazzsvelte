<script lang="ts">
    import type { ProgressSpinnerProps, ProgressSpinnerPtContext } from './progressSpinner.types'

    import { resolveDivPt, resolveSVGPt, resolveSVGCirclePt } from '@jazzsvelte/api'

    import { defaultProgressSpinnerProps as DEFAULT, globalProgressSpinnerPT as globalPt } from './progressSpinner.config'

    let {
        children,
        animationDuration = DEFAULT.animationDuration,
        fill = DEFAULT.fill,
        strokeWidth = DEFAULT.strokeWidth,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,

        ..._restProps
    }: ProgressSpinnerProps = $props()

    let _props: ProgressSpinnerProps = $derived({
        animationDuration,
        fill,
        pt,
        ptOptions,
        strokeWidth,
        style,
        unstyled,
        class: className
    })

    export const displayName = 'ProgressSpinner'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let ptContext: ProgressSpinnerPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-component', 'p-progress-spinner', className, {}],
                style,
                'data-pc-name': 'progressSpinner',
                'data-pc-section': 'root',
                'aria-busy': true
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "spinner" element
    let spinnerAttributes = $derived(
        resolveSVGPt(
            {
                class: ['p-progress-spinner-svg'],
                style: [style, { animationDuration }],
                viewBox: '25 25 50 50',
                'data-pc-section': 'spinner'
            },
            pt?.spinner,
            globalPt?.spinner,
            ptContext
        )
    )

    // "circle" element
    let circleAttributes = $derived(
        resolveSVGCirclePt(
            {
                class: ['p-progress-spinner-circle'],
                'data-pc-section': 'circle',
                cx: '50',
                cy: '50',
                r: '20',
                fill,
                'stroke-width': strokeWidth,
                'stroke-miterlimit': '10'
            },
            pt?.circle,
            globalPt?.circle,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    <svg {...spinnerAttributes}>
        <circle {...circleAttributes} />
    </svg>
</div>

<style>
    @layer primereact {
        .p-progress-spinner {
            position: relative;
            margin: 0 auto;
            width: 100px;
            height: 100px;
            display: inline-block;
        }

        .p-progress-spinner::before {
            content: '';
            display: block;
            padding-top: 100%;
        }

        .p-progress-spinner-svg {
            animation: p-progress-spinner-rotate 2s linear infinite;
            height: 100%;
            transform-origin: center center;
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }

        .p-progress-spinner-circle {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: 0;
            stroke: #d62d20;
            animation:
                p-progress-spinner-dash 1.5s ease-in-out infinite,
                p-progress-spinner-color 6s ease-in-out infinite;
            stroke-linecap: round;
        }
    }

    @keyframes p-progress-spinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes p-progress-spinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }

    @keyframes p-progress-spinner-color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
</style>

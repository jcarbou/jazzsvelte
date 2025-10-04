<script lang="ts">
    import type { ProgressBarProps, ProgressBarPtContext } from './progressBar.types'
    import { resolveDivPt } from '@jazzsvelte/api'
    import { defaultProgressBarProps as DEFAULT, globalProgressBarPT as globalPt } from './progressBar.config'

    let {
        children,
        color = DEFAULT.color,
        labelSnippet = DEFAULT.labelSnippet,
        mode = DEFAULT.mode,
        showValue = DEFAULT.showValue,
        unit = DEFAULT.unit,
        unstyled = DEFAULT.unstyled,
        value = DEFAULT.value,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: ProgressBarProps = $props()

    let _props: ProgressBarProps = $derived({
        color,
        labelSnippet,
        mode,
        pt,
        ptOptions,
        showValue,
        style,
        unit,
        unstyled,
        value,
        class: className
    })

    export const displayName = 'ProgressBar'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let ptContext: ProgressBarPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })

    let _valueStyle = $derived(
        mode === 'indeterminate'
            ? { backgroundColor: color }
            : { width: Math.max(+(value ?? 2), 2) + '%', display: 'flex', backgroundColor: value ? color : 'transparent' }
    )

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-component',
                    className,
                    {
                        'p-progressbar p-component p-progressbar-indeterminate': mode == 'indeterminate',
                        'p-progressbar p-component p-progressbar-determinate': mode !== 'indeterminate'
                    }
                ],
                style,
                role: 'progressbar',
                'data-pc-name': 'progressBar',
                'data-pc-section': 'root',
                'aria-valuemin': 0,
                'aria-valuenow': +(value ?? 0),
                'aria-valuemax': 100
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "container" element
    let containerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-progressbar-indeterminate-container'],
                'data-pc-section': 'container'
            },
            pt?.container,
            globalPt?.container,
            ptContext
        )
    )

    // "value" element
    let valueAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-progressbar-value', 'p-progressbar-value-animate'],
                'data-pc-section': 'value',
                style: _valueStyle
            },
            pt?.value,
            globalPt?.value,
            ptContext
        )
    )

    // "label" element
    let labelAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-progressbar-label'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if mode === 'determinate'}
        <div {...valueAttributes}>
            {#if showValue && value != null}
                <div {...labelAttributes}>
                    {#if labelSnippet}
                        {@render labelSnippet({ props: _props })}
                    {:else}
                        {value + (unit ?? '')}
                    {/if}
                </div>
            {/if}
        </div>
    {:else}
        <div {...containerAttributes}>
            <div {...valueAttributes}></div>
        </div>
    {/if}
</div>

<style>
    @layer primereact {
        .p-progressbar {
            position: relative;
            overflow: hidden;
        }

        .p-progressbar-determinate .p-progressbar-value {
            height: 100%;
            width: 0%;
            position: absolute;
            display: none;
            border: 0 none;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .p-progressbar-determinate .p-progressbar-label {
            display: inline-flex;
        }

        .p-progressbar-determinate .p-progressbar-value-animate {
            transition: width 1s ease-in-out;
        }

        .p-progressbar-indeterminate .p-progressbar-value::before {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
            animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }

        .p-progressbar-indeterminate .p-progressbar-value::after {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            -webkit-animation-delay: 1.15s;
            animation-delay: 1.15s;
        }
    }

    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }
    @keyframes p-progressbar-indeterminate-anim {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }

    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            left: -200%;
            right: 100%;
        }
        60% {
            left: 107%;
            right: -8%;
        }
        100% {
            left: 107%;
            right: -8%;
        }
    }
    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            left: -200%;
            right: 100%;
        }
        60% {
            left: 107%;
            right: -8%;
        }
        100% {
            left: 107%;
            right: -8%;
        }
    }
</style>

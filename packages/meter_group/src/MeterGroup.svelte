<script lang="ts">
    import type { MeterGroupEntry, MeterGroupLabelListProps, MeterGroupProps, MeterGroupPtContext } from './meterGroup.types'
    import {
        resolveDivPt,
        resolveSpanPt,
        resolveIPt,
        resolveOlPt,
        mergeCssClasses,
        mergeCssStyles,
        resolveElementPt,
        resolveLiPt
    } from '@jazzsvelte/api'
    import { defaultMeterGroupProps as DEFAULT, globalMeterGroupPT as globalPt } from './meterGroup.config'

    let {
        endSnippet = null,
        labelListSnippet = null,
        labelOrientation = DEFAULT.labelOrientation,
        labelPosition = DEFAULT.labelPosition,
        max = DEFAULT.max,
        meterSnippet = null,
        min = DEFAULT.min,
        orientation = DEFAULT.orientation,
        startSnippet = null,
        values = DEFAULT.values,
        pt = null,
        ptOptions = null,
        unstyled = DEFAULT.unstyled,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        ..._restProps
    }: MeterGroupProps = $props()

    let _props: MeterGroupProps = $derived({
        endSnippet,
        labelListSnippet,
        labelOrientation,
        labelPosition,
        max,
        meterSnippet,
        min,
        orientation,
        pt,
        ptOptions,
        unstyled,
        startSnippet,
        style,
        values,
        class: className
    })

    export const displayName = 'MeterGroup'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    let rootEl: HTMLDivElement

    let _labelSnippet = $derived(labelListSnippet ?? defaultLabelListSnippet)
    let totalPercent = $derived(values.reduce((sum, item) => sum + item.value, 0))
    let entries: MeterGroupEntry[] = $derived(
        values.map((item) => {
            const percentageOfItem = ((item.value - min) / (max - min)) * 100
            const percentage = Math.round(Math.max(0, Math.min(100, percentageOfItem)))
            return {
                item,
                percentage,
                totalPercent,
                meterStyles: {
                    backgroundColor: item.color,
                    width: orientation === 'horizontal' ? percentage + '%' : 'auto',
                    height: orientation === 'vertical' ? percentage + '%' : 'auto'
                }
            }
        })
    )

    let ptContext: MeterGroupPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
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
                    'p-metergroup p-component',
                    {
                        'p-metergroup-horizontal': orientation === 'horizontal',
                        'p-metergroup-vertical': orientation === 'vertical'
                    }
                ],
                style,
                role: 'meter',
                'data-pc-name': 'meterGroup',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "labelList" element
    let labelListAttributes = $derived(
        resolveOlPt(
            {
                class: [
                    'p-metergroup-label-list',
                    {
                        'p-metergroup-label-list-start': labelPosition === 'start',
                        'p-metergroup-label-list-end': labelPosition === 'end',
                        'p-metergroup-label-list-vertical': labelOrientation === 'vertical',
                        'p-metergroup-label-list-horizontal': labelOrientation === 'horizontal'
                    }
                ],
                'data-pc-section': 'labelList'
            },
            pt?.labelList,
            globalPt?.labelList,
            ptContext
        )
    )

    // "labelListItem" element
    let labelListItemAttributes = $derived(
        resolveLiPt(
            {
                class: ['p-metergroup-label-list-item'],
                'data-pc-section': 'labellistitem'
            },
            pt?.labelListItem,
            globalPt?.labelListItem,
            ptContext
        )
    )

    // "label" element
    let labelAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-metergroup-label'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "labelIcon" element
    let labelListIconAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-metergroup-label-type'],
                'data-pc-section': 'label'
            },
            pt?.label,
            globalPt?.label,
            ptContext
        )
    )

    // "meterContainer" element
    let meterContainerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-metergroup-meter-container'],
                'data-pc-section': 'metercontainer'
            },
            pt?.meterContainer,
            globalPt?.meterContainer,
            ptContext
        )
    )

    // "meter" element
    let meterAttributes = $derived(
        resolveElementPt(
            {
                class: ['p-metergroup-meter'],
                'data-pc-section': 'meter'
            },
            pt?.meter,
            globalPt?.meter,
            ptContext
        )
    )

    // "labelIcon" element
    let labelIconAttributes = $derived(
        resolveIPt(
            {
                class: ['p-metergroup-label-icon']
            },
            pt?.labelIcon,
            globalPt?.labelIcon,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps} aria-valuemin={min} aria-valuemax={max} aria-valuenow={totalPercent}>
    {#if labelPosition === 'start'}
        {@render _labelSnippet({ entries, totalPercent })}
    {/if}
    {#if startSnippet}
        {@render startSnippet({ entries, totalPercent })}
    {/if}
    <div {...meterContainerAttributes}>
        {#each entries as entry, index}
            {#if entry.item.meterSnippet}
                {@render entry.item.meterSnippet({ entry, index, meterAttributes })}
            {:else if meterSnippet}
                {@render meterSnippet({ entry, index, meterAttributes })}
            {:else}
                <span {...meterAttributes} style={mergeCssStyles([meterAttributes.style, entry.meterStyles])}> </span>
            {/if}
        {/each}
    </div>
    <span {...labelAttributes}></span>

    {#if endSnippet}
        {@render endSnippet({ entries, totalPercent })}
    {/if}
    {#if labelPosition === 'end'}
        {@render _labelSnippet({ entries, totalPercent })}
    {/if}
</div>

<!-- Default template for label -->
{#snippet defaultLabelListSnippet({ entries, totalPercent }: MeterGroupLabelListProps)}
    <ol {...labelListAttributes}>
        {#each entries as { item, percentage }}
            <li {...labelListItemAttributes}>
                {#if item.icon}
                    <i
                        {...labelIconAttributes}
                        class={mergeCssClasses([labelIconAttributes.class, item.icon])}
                        style="color:{item.color}"
                    ></i>
                {:else}
                    <span
                        {...labelListIconAttributes}
                        class={mergeCssClasses([labelListIconAttributes.class, item.icon])}
                        style={mergeCssStyles([labelListIconAttributes.style, { backgroundColor: item.color }])}
                    ></span>
                {/if}
                <span {...labelAttributes}>
                    {item?.label}
                    {`(${percentage}%)`}
                </span>
            </li>
        {/each}
    </ol>
{/snippet}

<style>
    @layer primereact {
        .p-metergroup {
            position: relative;
            overflow: hidden;
        }

        .p-metergroup-vertical.p-metergroup {
            display: flex;
        }

        .p-metergroup-vertical .p-metergroup-meter-container {
            flex-direction: column;
        }

        .p-metergroup-meter-container {
            display: flex;
        }

        .p-metergroup-label-list {
            display: flex;
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .p-metergroup-vertical .p-metergroup-label-list {
            align-items: start;
        }

        .p-metergroup-label-list-vertical {
            flex-direction: column;
        }

        .p-metergroup-label-list-horizontal {
            flex-direction: row;
        }

        .p-metergroup-label-list-item {
            display: inline-flex;
            align-items: center;
        }

        .p-metergroup-label-type {
            display: inline-block;
        }
    }
</style>

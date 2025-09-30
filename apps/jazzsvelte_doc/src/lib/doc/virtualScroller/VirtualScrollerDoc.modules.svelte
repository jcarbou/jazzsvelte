<script module lang="ts">
    import { type VirtualScrollerItemSnippetProps, type VirtualScrollerLoadingSnippetProps } from '@jazzsvelte/virtual_scroller'

    export { itemSnippet, itemArraySnippet, loadingSnippet }
</script>

{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${options._props.itemSize}px`}
    >
        {item}
    </div>
{/snippet}

{#snippet loadingSnippet({ options }: VirtualScrollerLoadingSnippetProps)}
    <div class={`flex align-items-center ${options.odd && 'odd'}`} style="height:50px;">
        <!---<Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />-->
        <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px"></div>
    </div>
{/snippet}

{#snippet itemArraySnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={`flex align-items-center p-2${options.odd ? ' surface-hover' : ''}`}
        style={`height: ${(options._props.itemSize as number[])[0]}px`}
    >
        {#each item as any[] as childItem, index (index)}
            <div style={`width:${(options._props.itemSize as number[])[1]}px`}>
                {childItem}
            </div>
        {/each}
    </div>
{/snippet}

export const codeItemSnippet = `
{#snippet itemSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options._props.itemSize}px\`}
    >
        {item}
    </div>
{/snippet}`

export const codeLoadingSnippet = `
{#snippet loadingSnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div sclass={\`flex align-items-center \${options.odd && 'odd'}\`} style="height:50px;">
       <div style="width:60%;height:1.3rem;background-color:grey;border-radius:4px"></div>
    </div>
{/snippet}`

export const codeItemArraySnippet = `
{#snippet itemArraySnippet({ item, options }: VirtualScrollerItemSnippetProps)}
    <div
        class={\`flex align-items-center p-2\${options.odd ? ' surface-hover' : ''}\`}
        style={\`height: \${options._props.itemSize[0]}px\`}
    >
        {#each item as childItem, index (index)}
            <div style={\`width:\${options._props.itemSize[1]}px\`}>
                {childItem}
            </div>
        {/each}
    </div>
{/snippet}`

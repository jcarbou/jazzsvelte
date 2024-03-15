<script lang="ts">
    import { buttonClasses } from './TopBarUtils'
    import { clickOutside } from '$lib/utils/clickOutside.js'
    import { fade, scale } from 'svelte/transition'

    const versions = [
        {
            name: 'v0',
            version: '0.1.0',
            url: 'https://github.com/jcarbou/jazzsvelte'
        }
    ]

    let isVersionExpanded = false
</script>

<button on:click={() => (isVersionExpanded = !isVersionExpanded)} style="maxWidth: '8rem'" class="{buttonClasses} px-1">
    <span class="text-900 block white-space-nowrap overflow-hidden">
        {versions?.length ? versions[0].version : ''}
    </span>
    <span class="ml-2 pi pi-angle-down text-600"></span>
</button>
{#if isVersionExpanded}
    <div class="p-3 surface-overlay absolute right-0 top-auto rounded shadow-lg origin-top w-8rem" in:scale out:fade use:clickOutside on:clickoutside={() => (isVersionExpanded = false)}>
        <ul class="list-none m-0 p-0">
            {#each versions as version (version.name)}
                <li role="none">
                    <a href={version.url} class="inline-flex p-2 rounded hover:surface-hover w-full">
                        <span class="font-bold text-900">{version.name}</span>
                        <span class="ml-2 text-700 white-space-nowrap block overflow-hidden text-overflow-ellipsis">({version.version})</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/if}

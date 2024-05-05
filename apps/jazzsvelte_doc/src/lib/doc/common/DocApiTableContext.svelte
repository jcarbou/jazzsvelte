<script lang="ts">
    import { page } from '$app/stores'
    import { getContext } from 'svelte'
    import type { ApiTableInfo } from './doc.types'

    type LinkEntry = {
        index: number
        hasName: boolean
        apiId: string
        label: string
    }

    export let value: string
    export let isLinkableOption: boolean = false
    export let deprecated: string | undefined = undefined

    const { id, name, allowLink } = getContext<ApiTableInfo>('apiTabelInfo')
    const { pathname } = $page.url

    const onClick = (id: string, behavior?: ScrollBehavior) => {
        document?.getElementById(id)?.parentElement?.scrollIntoView({ block: 'start', behavior })
    }

    let val: string = ''
    let links: LinkEntry[] = []

    $: {
        val = value && value.includes('": "') ? value.replace(/['"]+/g, '').replace(/\.,/gm, '.') : value
        links = value.split('|').map((sValue, index) => {
            const hasName = !!(name && sValue.includes(name))
            if (hasName) {
                const nameIndex = sValue.indexOf(name)
                const key = sValue
                    .substring(nameIndex)
                    .replace(/(\[|\]|<|>).*$/gm, '')
                    .trim()

                const apiId = name === key ? `api.${name}` : `api.${name}.${key === `${name}Props` ? 'props' : key}`
                return {
                    index,
                    hasName,
                    apiId,
                    label: sValue
                }
            }

            return {
                index,
                hasName,
                apiId: id + '.' + sValue,
                label: sValue
            }
        })
    }
</script>

{#if allowLink && value}
    {#each links as link, i (i)}
        {#if link.hasName}
            {link.index !== 0 ? '|' : ''}
            <a href={pathname + `#${link.apiId}`} target="_self">
                <a on:click={() => onClick(link.apiId, 'smooth')}>{link.label}</a>
            </a>
        {:else}
            {i !== 0 ? '|' : ''}
            {#if isLinkableOption}
                <span
                    id={id + '.' + link.label}
                    class="doc-option-name"
                    class:line-through={!!deprecated}
                    class:cursor-pointer={!!deprecated}
                    title={deprecated}
                >
                    {link.label}
                    <a href={pathname + `#${link.apiId}`} target="_self">
                        <a on:click={() => onClick(link.apiId)} class="doc-option-link">
                            <i class="pi pi-link"></i>
                        </a>
                    </a>
                </span>
            {:else}
                {link.label}
            {/if}
        {/if}
    {/each}
{:else if isLinkableOption}
    <span
        id={id + '.' + val}
        class="doc-option-name"
        class:line-through={!!deprecated}
        class:cursor-pointer={!!deprecated}
        title={deprecated}
    >
        {val}
        <a href={pathname + `#${id + '.' + val}`} target="_self">
            <a on:click={() => onClick(id + '.' + val)} class="doc-option-link">
                <i class="pi pi-link"></i>
            </a>
        </a>
    </span>
{:else}
    {val}
{/if}

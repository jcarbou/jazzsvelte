<script lang="ts">
    import { JazzSvelte } from '@jazzsvelte/api'
    import { ComponentType, SvelteComponent } from 'svelte'

    export let Component: ComponentType
    export let props = {}
    export const getTestedComponent = () => component

    let component: SvelteComponent | null = null
</script>

<JazzSvelte>
    <svelte:component this={Component} bind:this={component} {...props} />
</JazzSvelte>

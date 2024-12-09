<script lang="ts">
    import { JazzSvelte } from '@jazzsvelte/api'
    import { Component as _Component, SvelteComponent } from 'svelte'

    interface Props {
        Component: _Component
        props?: any
    }

    let { Component, props = {} }: Props = $props()
    export const getTestedComponent = () => component

    let component: SvelteComponent | null = $state(null)
</script>

<JazzSvelte>
    <Component bind:this={component} {...props} />
</JazzSvelte>

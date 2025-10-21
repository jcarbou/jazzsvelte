<script lang="ts" generics="CMP extends Component">
    import { JazzSvelte } from '@jazzsvelte/api'
    import { Component } from 'svelte'
    import { ComponentToTestProps, TestedComponent } from './utils.types'

    interface Props {
        ComponentToTest: CMP
        props?: ComponentToTestProps<CMP>
    }

    let { ComponentToTest, props }: Props = $props()
    let testedComponent: TestedComponent
    export const getTestedComponent = () => testedComponent
</script>

<JazzSvelte>
    <ComponentToTest bind:this={testedComponent} {...props}></ComponentToTest>
</JazzSvelte>

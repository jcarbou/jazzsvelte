import { Component, ComponentProps, SvelteComponent } from 'svelte'

export type ComponentToTestProps<CMP extends Component> = ComponentProps<CMP> & { 'data-tested-element': true }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestedComponent = SvelteComponent<Record<string, any>, any, any>

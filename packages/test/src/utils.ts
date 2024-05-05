import { render } from '@testing-library/svelte'
import { expect, test } from 'vitest'
import JazzSvelteTestContext from './JazzSvelteTestContext.svelte'
import { ComponentProps, ComponentType, SvelteComponent } from 'svelte'

export function snapshot<CMP extends SvelteComponent>(label: string, Component: ComponentType<CMP>, props: ComponentProps<CMP>) {
    containerTest(label, Component, props, (container) => {
        expect(container).toMatchSnapshot()
    })
}

export function containerTest<CMP extends SvelteComponent>(
    label: string,
    Component: ComponentType<CMP>,
    props: ComponentProps<CMP>,
    callback: (
        container: Element | null,
        testedComponent: SvelteComponent | null,
        contextComponent: JazzSvelteTestContext
    ) => void
) {
    test(label, async () => {
        const { container, component } = render(JazzSvelteTestContext, {
            props: {
                Component,
                props: { ...props, 'data-tested-element': true }
            }
        })

        callback(container.querySelector('[data-tested-element]'), component.getTestedComponent(), component)
    })
}

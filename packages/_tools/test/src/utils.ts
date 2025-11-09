import { render } from '@testing-library/svelte'
import { expect, test } from 'vitest'
import JazzSvelteTestContext from './JazzSvelteTestContext.svelte'
import type { ComponentProps, Component } from 'svelte'
import type { TestedComponent } from './utils.types'

export function snapshot<CMP extends Component>(label: string, ComponentToTest: CMP, props: ComponentProps<CMP>) {
    containerTest(label, ComponentToTest, props, (container) => {
        expect(container).toMatchSnapshot()
    })
}

export function containerTest<CMP extends Component>(
    label: string,
    ComponentToTest: CMP,
    componentToProps: ComponentProps<CMP>,
    callback: (
        container: Element | null,
        testedComposnent: TestedComponent | null,
        contextComponent: JazzSvelteTestContext<CMP>
    ) => void
) {
    test(label, async () => {
        const { container, component } = render(JazzSvelteTestContext<CMP>, {
            props: {
                ComponentToTest,
                props: { ...componentToProps, 'data-tested-element': true }
            }
        })

        await callback(container.querySelector('[data-tested-element]'), component.getTestedComponent(), component)
    })
}

export async function later(delay: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay)
    })
}

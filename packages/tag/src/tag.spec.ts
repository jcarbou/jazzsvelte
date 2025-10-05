import { describe } from 'vitest'
import Tag from './Tag.svelte'
import { snapshot } from '@jazzsvelte/test'

describe('Button', () => {
    snapshot('when default', Tag, {})
    snapshot('when value', Tag, { value: 'jest' })
    snapshot('when severity success', Tag, { severity: 'success' })
    snapshot('when severity info', Tag, { severity: 'info' })
    snapshot('when severity warning', Tag, { severity: 'warning' })
    snapshot('when severity danger', Tag, { severity: 'danger' })
    snapshot('when rounded', Tag, { rounded: true })
    snapshot('when icon', Tag, { icon: 'pi pi-check' })
})

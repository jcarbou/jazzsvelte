import { describe } from 'vitest'
import { snapshot } from '@jazzsvelte/test'
import MeterGroup from './MeterGroup.svelte'

describe('MeterGroup', () => {
    snapshot('when default', MeterGroup, { values: [{ label: 'default', value: 15 }] })
})

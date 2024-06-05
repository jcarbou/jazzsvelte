import '@testing-library/jest-dom'
import { describe } from 'vitest'
import Badge from './Badge.svelte'
import { snapshot } from '@jazzsvelte/test'

describe('Badge', () => {
    snapshot('default', Badge, {})
    snapshot('value', Badge, { value: 22 })
    snapshot('size large', Badge, { size: 'large' })
    snapshot('size xlarge', Badge, { size: 'xlarge' })
    snapshot('severity success', Badge, { severity: 'success' })
    snapshot('severity info', Badge, { severity: 'info' })
    snapshot('severity warning', Badge, { severity: 'warning' })
    snapshot('severity danger', Badge, { severity: 'danger' })
})

import '@testing-library/jest-dom'
import {describe, expect, vi} from 'vitest'
import { Badge } from './Badge'
import { containerTest, snapshot} from '@jazzsvelte/test'

describe('Badge', () => {
   snapshot('default', Badge, { })
   snapshot('value', Badge, { value: 22})
   snapshot('size large', Badge, { size:"large" })
   snapshot('size xlarge', Badge, { size:"xlarge" })
   snapshot('size invalid', Badge, { size:"invalid" })
   snapshot('severity success', Badge, { severity:"success" })
   snapshot('severity info', Badge, { severity:"info" })
   snapshot('severity warning', Badge, { severity:"warning" })
   snapshot('severity danger', Badge, { severity:"danger" })
   snapshot('severity invalid', Badge, { severity:"invalid" })
});

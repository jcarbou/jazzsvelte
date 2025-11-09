import { render } from '@testing-library/svelte'
import Avatar from './Avatar.svelte'
import { expect, test } from 'vitest'

test('when visible is false Button returns null', () => {
    const { container } = render(Avatar, { label: 'test' })
    expect(container.innerHTML).toBe('')
})
/*import { describe } from 'vitest'
import { containerTest, snapshot } from '@jazzsvelte/test'

describe('Button', () => {
    snapshot('when TODO', Avatar, { aProp: 'todo' })
})*/

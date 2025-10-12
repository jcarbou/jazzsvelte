import { describe } from 'vitest'
import Message from './Message.svelte'
import { snapshot } from '@jazzsvelte/test'

describe('Message', () => {
    snapshot('when TODO', Message, { aProp: 'todo' })

    snapshot('default', Message, {})
    snapshot('severity success', Message, { severity: 'success', text: 'Jest' })
    snapshot('severity info', Message, { severity: 'info', text: 'Jest' })
    snapshot('severity warn', Message, { severity: 'warn', text: 'Jest' })
    snapshot('severity error', Message, { severity: 'error', text: 'Jest' })
    snapshot('icon', Message, { icon: 'pi pi-check' })
})

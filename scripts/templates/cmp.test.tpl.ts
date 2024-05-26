import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(api: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    return `import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import ${CmpName}from './${CmpName}.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', ${CmpName}, {aProp:'todo'})
    })   

    containerTest('when todo', ${CmpName}, {aProp:'todo'}, async (${cmpName}El, ${cmpName}) => {
        expect(${cmpName}El).not.toBeNull()
        expect(${cmpName}).not.toBeNull()

        if ($${CmpName}El) {

        }
    })
`
}

export function generateCmpTest(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'testPath', render, options)
}

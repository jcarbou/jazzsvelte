import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Steps from './Steps.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Steps, {aProp:'todo'})
    })   

    containerTest('when todo', Steps, {aProp:'todo'}, async (stepsEl, steps) => {
        expect(stepsEl).not.toBeNull()
        expect(steps).not.toBeNull()

        if ($StepsEl) {

        }
    })

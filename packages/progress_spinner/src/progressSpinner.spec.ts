import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import ProgressSpinner from './ProgressSpinner.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', ProgressSpinner, {aProp:'todo'})
    })   

    containerTest('when todo', ProgressSpinner, {aProp:'todo'}, async (progressSpinnerEl, progressSpinner) => {
        expect(progressSpinnerEl).not.toBeNull()
        expect(progressSpinner).not.toBeNull()

        if ($ProgressSpinnerEl) {

        }
    })

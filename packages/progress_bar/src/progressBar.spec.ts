import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import ProgressBar from './ProgressBar.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', ProgressBar, {aProp:'todo'})
    })   

    containerTest('when todo', ProgressBar, {aProp:'todo'}, async (progressBarEl, progressBar) => {
        expect(progressBarEl).not.toBeNull()
        expect(progressBar).not.toBeNull()

        if ($ProgressBarEl) {

        }
    })

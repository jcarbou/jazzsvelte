import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import SplitButtonfrom './SplitButton.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', SplitButton, {aProp:'todo'})
    })   

    containerTest('when todo', SplitButton, {aProp:'todo'}, async (splitButtonEl, splitButton) => {
        expect(splitButtonEl).not.toBeNull()
        expect(splitButton).not.toBeNull()

        if ($SplitButtonEl) {

        }
    })

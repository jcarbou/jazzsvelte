import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import BlockUI from './BlockUI.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', BlockUI, {aProp:'todo'})
    })   

    containerTest('when todo', BlockUI, {aProp:'todo'}, async (blockUIEl, blockUI) => {
        expect(blockUIEl).not.toBeNull()
        expect(blockUI).not.toBeNull()

        if ($BlockUIEl) {

        }
    })

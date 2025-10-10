import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Chip from './Chip.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Chip, {aProp:'todo'})
    })   

    containerTest('when todo', Chip, {aProp:'todo'}, async (chipEl, chip) => {
        expect(chipEl).not.toBeNull()
        expect(chip).not.toBeNull()

        if ($ChipEl) {

        }
    })

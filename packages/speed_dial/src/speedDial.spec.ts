import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import SpeedDialfrom './SpeedDial.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', SpeedDial, {aProp:'todo'})
    })   

    containerTest('when todo', SpeedDial, {aProp:'todo'}, async (speedDialEl, speedDial) => {
        expect(speedDialEl).not.toBeNull()
        expect(speedDial).not.toBeNull()

        if ($SpeedDialEl) {

        }
    })

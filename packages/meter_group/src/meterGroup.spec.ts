import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import MeterGroup from './MeterGroup.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', MeterGroup, {aProp:'todo'})
    })   

    containerTest('when todo', MeterGroup, {aProp:'todo'}, async (meterGroupEl, meterGroup) => {
        expect(meterGroupEl).not.toBeNull()
        expect(meterGroup).not.toBeNull()

        if ($MeterGroupEl) {

        }
    })

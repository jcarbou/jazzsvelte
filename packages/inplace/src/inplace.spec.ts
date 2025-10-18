import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Inplace from './Inplace.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Inplace, {aProp:'todo'})
    })   

    containerTest('when todo', Inplace, {aProp:'todo'}, async (inplaceEl, inplace) => {
        expect(inplaceEl).not.toBeNull()
        expect(inplace).not.toBeNull()

        if ($InplaceEl) {

        }
    })

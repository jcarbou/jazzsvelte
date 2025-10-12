import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Card from './Card.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Card, {aProp:'todo'})
    })   

    containerTest('when todo', Card, {aProp:'todo'}, async (cardEl, card) => {
        expect(cardEl).not.toBeNull()
        expect(card).not.toBeNull()

        if ($CardEl) {

        }
    })

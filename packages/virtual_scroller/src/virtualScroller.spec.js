import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import VirtualScroller from './VirtualScroller.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', VirtualScroller, {aProp:'todo'})
    })   

    containerTest('when todo', VirtualScroller, {aProp:'todo'}, async (virtualScrollerEl, virtualScroller) => {
        expect(virtualScrollerEl).not.toBeNull()
        expect(virtualScroller).not.toBeNull()

        if ($VirtualScrollerEl) {

        }
    })

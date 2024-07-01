import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import TieredMenufrom './TieredMenu.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', TieredMenu, {aProp:'todo'})
    })   

    containerTest('when todo', TieredMenu, {aProp:'todo'}, async (tieredMenuEl, tieredMenu) => {
        expect(tieredMenuEl).not.toBeNull()
        expect(tieredMenu).not.toBeNull()

        if ($TieredMenuEl) {

        }
    })

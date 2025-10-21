import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import TabMenu from './TabMenu.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', TabMenu, {aProp:'todo'})
    })   

    containerTest('when todo', TabMenu, {aProp:'todo'}, async (tabMenuEl, tabMenu) => {
        expect(tabMenuEl).not.toBeNull()
        expect(tabMenu).not.toBeNull()

        if ($TabMenuEl) {

        }
    })

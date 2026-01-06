import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import PanelMenu from './PanelMenu.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', PanelMenu, {aProp:'todo'})
    })   

    containerTest('when todo', PanelMenu, {aProp:'todo'}, async (panelMenuEl, panelMenu) => {
        expect(panelMenuEl).not.toBeNull()
        expect(panelMenu).not.toBeNull()

        if ($PanelMenuEl) {

        }
    })

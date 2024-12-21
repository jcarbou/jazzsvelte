import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Panel from './Panel.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Panel, {aProp:'todo'})
    })   

    containerTest('when todo', Panel, {aProp:'todo'}, async (panelEl, panel) => {
        expect(panelEl).not.toBeNull()
        expect(panel).not.toBeNull()

        if ($PanelEl) {

        }
    })

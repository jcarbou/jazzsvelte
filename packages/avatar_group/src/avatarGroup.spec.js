import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import AvatarGroup from './AvatarGroup.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', AvatarGroup, {aProp:'todo'})
    })   

    containerTest('when todo', AvatarGroup, {aProp:'todo'}, async (avatarGroupEl, avatarGroup) => {
        expect(avatarGroupEl).not.toBeNull()
        expect(avatarGroup).not.toBeNull()

        if ($AvatarGroupEl) {

        }
    })

import  { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte';
    import {describe, expect, vi} from 'vitest'
    import Avatar from './Avatar.svelte';
    import { containerTest, snapshot} from '@jazzsvelte/test'
    
    describe('Button', () => { 
        snapshot('when TODO', Avatar, {aProp:'todo'})
    })   

    containerTest('when todo', Avatar, {aProp:'todo'}, async (avatarEl, avatar) => {
        expect(avatarEl).not.toBeNull()
        expect(avatar).not.toBeNull()

        if ($AvatarEl) {

        }
    })

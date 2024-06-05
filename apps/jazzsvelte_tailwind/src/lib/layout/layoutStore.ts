import { writable } from 'svelte/store'
import { createVisibilityStore, createBooleanStore } from '@jazzsvelte/utils'

// General
export const theme = writable<string>('lara-light-amber')
export const ripple = writable<boolean>(false)
export const inputStyle = writable<string>('filled')

// Dark Mode visibility
export const darkMode = createBooleanStore(false)

// Config section and "Show Config Section Button" visibility
export const configButton = createVisibilityStore(true)
export const config = createVisibilityStore()

// Side Bar Section and "Show Side Bar Section Button" visibility
export const sideBarButton = createVisibilityStore(true)
export const sideBar = createVisibilityStore(true)

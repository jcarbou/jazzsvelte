import { writable } from 'svelte/store'
import AnnouncementData from './news.json'
import { createVisibilityStore, createBooleanStore } from '$lib/components/utils/customStores'

// General
export const theme = writable<string>('lara-light-amber')
export const ripple = writable<boolean>(false)
export const inputStyle = writable<string>('filled')

// Announcement
export type Announcement = {
    id: number
    content?: string
    linkHref?: string
    linkText?: string
}

export const announcement = writable<Announcement>(AnnouncementData)

// News Visibility
export const news = createVisibilityStore(true)

// Dark Mode visibility
export const darkMode = createBooleanStore(false)

// Config section and "Show Config Section Button" visibility
export const configButton = createVisibilityStore(true)
export const config = createVisibilityStore()

// Side Bar Section and "Show Side Bar Section Button" visibility
export const sideBarButton = createVisibilityStore(true)
export const sideBar = createVisibilityStore(true)

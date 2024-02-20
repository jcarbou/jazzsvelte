import { writable } from 'svelte/store'
import AnnouncementData from './news.json'

// General 
export const theme = writable<string>("lara-light-amber")

export const darkMode = writable<boolean>(false)
export const ripple = writable<boolean>(false)
export const inputStyle = writable<string>('filled')

// Announcement
export type Announcement = {
    id: number
    content? :  string
    linkHref?: string
    linkText?: string
}

export const announcement = writable<Announcement>(AnnouncementData)

// News Visibility

export const newsVisible = writable<boolean>(true)

export function setNewsVisible(state:boolean) {
    newsVisible.update(() => state)
}
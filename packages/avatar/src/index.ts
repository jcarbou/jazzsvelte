import type { ApiDocData } from '@jazzsvelte/api'
export * from './avatar.types'
export * from './avatar.config'
export { default as Avatar } from './Avatar.svelte'
import avatarApi from './avatar.api.json'
export const avatarApiData: ApiDocData = avatarApi

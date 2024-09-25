import type { ApiDocData } from '@jazzsvelte/api'
export * from './avatarGroup.types'
export * from './avatarGroup.config'
export { default as AvatarGroup } from './AvatarGroup.svelte'
import avatarGroupApi from './avatarGroup.api.json'
export const avatarGroupApiData: ApiDocData = avatarGroupApi

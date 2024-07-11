export { default as Badge } from './Badge.svelte'
export * from './badge.config'
export * from './badge.types'
import { ApiDocData } from '@jazzsvelte/api'
import badgeApi from './badge.api.json'
export const badgeApiData: ApiDocData = badgeApi

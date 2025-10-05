import type { ApiDocData } from '@jazzsvelte/api'
export * from './tag.types'
export * from './tag.config'
export { default as Tag } from './Tag.svelte'
import tagApi from './tag.api.json'
export const tagApiData: ApiDocData = tagApi

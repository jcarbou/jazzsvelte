import type { ApiDocData } from '@jazzsvelte/api'
export * from './scrollTop.types'
export * from './scrollTop.config'
export { default as ScrollTop } from './ScrollTop.svelte'
import scrollTopApi from './scrollTop.api.json'
export const scrollTopApiData: ApiDocData = scrollTopApi

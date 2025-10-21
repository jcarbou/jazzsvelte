import type { ApiDocData } from '@jazzsvelte/api'
export * from './blockUI.types'
export * from './blockUI.config'
export { default as BlockUI } from './BlockUI.svelte'
import blockUIApi from './blockUI.api.json'
export const blockUIApiData: ApiDocData = blockUIApi

import type { ApiDocData } from '@jazzsvelte/api'
export * from './chip.types'
export * from './chip.config'
export { default as Chip } from './Chip.svelte'
import chipApi from './chip.api.json'
export const chipApiData: ApiDocData = chipApi

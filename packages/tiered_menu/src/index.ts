export * from './tieredMenu.types'
export * from './tieredMenu.config'
export { default as TieredMenu } from './TieredMenu.svelte'
import { ApiDocData } from '@jazzsvelte/api'
import tieredMenuApi from './tieredMenu.api.json'
export const tieredMenuApiData: ApiDocData = tieredMenuApi
